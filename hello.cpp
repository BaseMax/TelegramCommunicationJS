#include <stdio.h>
#include <stdlib.h>
#include <cstring>
#include <emscripten.h>
#include <emscripten/websocket.h>
#include <emscripten/bind.h>
#include <time.h>
#include "myfunc.h"


using namespace emscripten;

unsigned char mode = 0;
EMSCRIPTEN_WEBSOCKET_T socket = NULL;
uint8_t key[32];
uint8_t iv[16];
uint8_t revkey[32];
uint8_t reviv[16];

void _rnd(uint8_t* array, uint8_t* revarray, int len){
	for(int i=0;i<len;i++){
		uint8_t t = (uint8_t)(emscripten_random()*256);
		revarray[len-i-1] = t;
		array[i] = t;
	}
}

void ar_ar(uint8_t* dest, uint8_t* src, int len){
	for(int i=0;i<len;i++){
		dest[i] = src[len-i];
	}
}

void ll_ar(uint8_t* dest, int64_t src){
	for(int i=0;i<8;i++){
		dest[i] = (src & 0x00000000000000ff);
		src >>= 8;
	}
}
void l_ar(uint8_t* dest, int32_t src){
	for(int i=0;i<4;i++){
		dest[i] = (src & 0x000000ff);
		src >>= 8;
	}
}


void reqpq()
{
	emscripten_pause_main_loop();
	
    uint8_t in[105] ;
    uint8_t out[64];
    uint8_t enc_buf[64];
    uint8_t revin[64] ;
	
	_rnd(in,revin,64);
	memcpy(&out, &in[0], 64);

	memcpy(&key, &in[8], 32);
	memcpy(&iv, &in[40], 16);
	
	memcpy(&revkey, &revin[8], 32);
	memcpy(&reviv, &revin[40], 16);

	in[56]=0xef;
	in[57]=0xef;
	in[58]=0xef;
	in[59]=0xef;

	
    uint8_t req_pq[41];
	char* ptrMsgID = getNewMsgId();
	memcpy(&req_pq[1], ptrMsgID , 40);
	req_pq[0]=0x0a;

	
	memcpy(&in[64], &req_pq[0], 41);
	
	
	char* ptrEncrypt = mycrypt(key, iv, in, sizeof(in));
	memcpy(&enc_buf, ptrEncrypt , sizeof(enc_buf));
	memcpy(&req_pq, ptrEncrypt+64 , sizeof(req_pq));

	
	out[56]=enc_buf[56];
	out[57]=enc_buf[57];
	out[58]=enc_buf[58];
	out[59]=enc_buf[59];


	
	
//	char* ptrDecrypt = mycrypt(key, iv, out, sizeof(out));
//	memcpy(&enc_buf, ptrDecrypt , sizeof(enc_buf));

//rintf("enc \n"); for(int i= 0; i< 64;i++){printf(" %02x", enc_buf[i]);if(!((i+1) % 16))printf("\n");}	printf("\n");

	emscripten_websocket_send_binary(socket, out, sizeof(out));


	emscripten_websocket_send_binary(socket, req_pq	, sizeof(req_pq));
	
	emscripten_resume_main_loop();
}


void main_proc() {
	switch (mode) {
		case 0: {
			unsigned short readyState;
			emscripten_websocket_get_ready_state(socket, &readyState);
			if( readyState == 1 ) mode = 1;
			break;
		}
		case 1: {
			reqpq();
			mode = 2;
			break;
		}
		case 2:{
			mode = 3;
		}
	}
	printf("step %2x\n",mode);
}	



EM_BOOL WebSocketOpen(int eventType, const EmscriptenWebSocketOpenEvent *e, void *userData)
{
	return 0;
}

EM_BOOL WebSocketClose(int eventType, const EmscriptenWebSocketCloseEvent *e, void *userData)
{
	printf("close(eventType=%2x, wasClean=%2x, code=%2x, reason=%s, userData=%2x)\n", eventType, e->wasClean, e->code, e->reason, (int)userData);
	return 0;
}

EM_BOOL WebSocketError(int eventType, const EmscriptenWebSocketErrorEvent *e, void *userData)
{
	printf("error(eventType=%2x, userData=%2x)\n", eventType, (int)userData);
	return 0;
}

EM_BOOL WebSocketMessage(int eventType, const EmscriptenWebSocketMessageEvent *e, void *userData)
{
	printf("message(eventType=%2x, userData=%2x, data=%p, numBytes=%2x, isText=%2x)\n", eventType, (int)userData, e->data, e->numBytes, e->isText);
	if (e->isText)
		printf("text data: \"%s\"\n", e->data);
	else
	{
		printf("binary data:");
		for(int i = 0; i < e->numBytes; ++i)
			printf(" %02X", e->data[i]);
		printf("\n");

//		emscripten_websocket_delete(e->socket);
    	char* ptrDecrypt = mycrypt(revkey, reviv, e->data, e->numBytes);
		printf("binary data:");
		for(int i = 0; i < e->numBytes; ++i)
			printf(" %02X", (uint8_t)*ptrDecrypt++);
		printf("\n");
		emscripten_run_script("alert('look console.log')");
	}
	
	return 0;
}

void EMSCRIPTEN_KEEPALIVE  connect(std::string url)
{
	if (!emscripten_websocket_is_supported())
	{
		printf("WebSockets are not supported, cannot continue!\n");
		exit(1);
	}

	EmscriptenWebSocketCreateAttributes attr;
	emscripten_websocket_init_create_attributes(&attr);

	attr.url = url.c_str();

	socket = emscripten_websocket_new(&attr);
	if (socket <= 0)
	{
		printf("WebSocket creation failed, error code %2x!\n", (EMSCRIPTEN_RESULT)socket);
		exit(1);
	}

	emscripten_websocket_set_onopen_callback(socket, (void*)42, WebSocketOpen);
	emscripten_websocket_set_onclose_callback(socket, (void*)43, WebSocketClose);
	emscripten_websocket_set_onerror_callback(socket, (void*)44, WebSocketError);
	emscripten_websocket_set_onmessage_callback(socket, (void*)45, WebSocketMessage);

    emscripten_set_main_loop(main_proc, 60, 0);

}


EMSCRIPTEN_BINDINGS(my_module) {
function("connect", &connect);
}