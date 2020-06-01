self.window = self
self.importScripts('settings.js');
self.importScripts('utils.js');
self.importScripts('func.js');
self.importScripts('taffy-min.js');

var encryptor = null
var decryptor = null
var socket = null
var ready = false
var _serverKeys = {};
var auth_key = {_key: null, auxHash: null, keyId: null }
var _id = readBigIntFromBuffer(crypto.getRandomValues(new Uint8Array(8)))
var _salt = 0
var _nonce = null 
var timeOffset = 0
var connect_state = 0;
var message_id = 0
var ok_message = [1,'Connected to server: <b>Ok</b>']
var message_queue = TAFFY([])
var process_message_running = false
var DCindex = 0

onmessage = function(e) {
  switch (e.data[0]){
	case 'connect': {
						DCindex = parseInt(e.data[1])
//						console.log(message_body) 
						connect_to_server()
						break
	  				}
	case 'message_to_queue': {
						var message_body = e.data[2]
						console.log(message_body) 
						if(connect_state != 6) throw Error('connection to the server is not ready. number to transfer nowhere.')
						e.data[1].issent = false
    					e.data[1].isresponse_received = false
    					e.data[1].isread = false
						message_queue.insert(e.data[1])

						break
	  				}
	case 'process_message_queue': {
						if(!process_message_running) process_message()
						break
	  				}

	case 'status': {
						console.log('MtProto status reqest') 
						postMessage([10,connect_state]);
						break
	  				}
  
  }
}

function newMsgId(){
		var now = new Date().getTime() / 1000 + timeOffset//0 //timeofset;
		var nanoseconds     = Math.floor((now - Math.floor(now)) * 1e9);
    	var newMsgId        = BigInt(Math.floor(now)) << BigInt(32) | BigInt(nanoseconds) << BigInt(2)
		return newMsgId
}


class TlLine {
	constructor(){
	}
	set(inArray){
		var properties = Object.getOwnPropertyNames(this);
		for(var i=0;i<properties.length;i++){
			inArray = this[properties[i]].set(inArray)
		}
		return inArray
	}
	get(){
		var ret = []
		var properties = Object.getOwnPropertyNames(this);
		for(var i=0;i<properties.length;i++){
			ret = ret.concat(this[properties[i]].get())
		}
		return ret
	}
}
class tl_vector_long{
	constructor(){
		this.value = []
	}
	set(inArray){
		inArray = inArray.slice(4)
		var num_elements = inArray[0] + (inArray[1]<<8) + (inArray[2]<<16) + (inArray[3]<<24)
		inArray = inArray.slice(4)
		for(var i = 0; i< num_elements; i++){
			var res =[]
			for(var j=0; j<8;j++){
			  res.push(inArray[j+i*8]);
			}
			this.value.push(readBigIntFromBuffer(res,true,true))
		}
		return inArray.slice(num_elements*8)
	}
	get(num){
		if(num == null){
			var res = []
			for(var j=0;j<this.value.length;j++){
				var hex = (Array(16).join("0") + this.value[j].toString(16)).slice(-16);
				for (var i = 0; i < 16; i += 2) {
					res.push(parseInt(hex.substr(i, 2),16));
				}
			}
			var len = [(this.value.length>>24)&0xff,(this.value.length>>16)&0xff,(this.value.length>>8)&0xff,(this.value.length)&0xff]
			res = res.concat(len)
			res = res.concat([0x1c, 0xb5, 0xc4, 0x15]);
			return res.reverse();		
		}else{
			return readBufferFromBigInt(this.value[num], 8, true, true)
		}
	}
}
class tl_array {
	constructor(){
		this.value = []
	}
	set(inArray){
		var length = inArray.length
		this.value=[]
		for(var i = 0; i< length; i++){
			this.value.push(inArray[i])
		}
	}
	get(){
		return this.value
	}
}
class tl_byte {
	constructor(){
		this.value = []
	}
	set(inArray){
		this.value=[]
		var start = 1
		var length = 0
		if(inArray[0] <= 253) {
			length = inArray[0]
		} else {
			length = inArray[1] + (inArray[2]<<8) + (inArray[3]<<16)
			start = 4
		}
		for(var i = 0; i< length; i++){
			this.value.push(inArray[start+i])
		}
		var padding = ((start+length) % 4) ? (4-((start+length) % 4)) : 0
		return inArray.slice(start+length+padding)
	}
	get(){
		var ret = []
		if(this.value.length <= 253){
			ret.push(this.value.length)
		}else{
			ret.push(254)
			ret.push(this.value.length & 0xff)
			ret.push((this.value.length >> 8 )& 0xff)
			ret.push((this.value.length >> 16 )& 0xff)
		}
		for(var i = 0;i<this.value.length;i++){
			ret.push(this.value[i])
		}
		var padding = ((ret.length) % 4) ? (4 - ((ret.length) % 4)) : 0
		for(var i = 0; i< padding;i++){
			ret.push(0)
		}
		return ret
	}
	asNum(){
		var res=""
		for(var i=0; i<this.value.length;i++){
			res = res+(('0' + (this.value[i] & 0xFF).toString(16)).slice(-2));
		}
		res="0x"+res
		return this.value.length>4 ? BigInt(res) : parseInt(res)
	}
	fromNum(num){

		this.value = BigIntToAray(num)//res
	}
	fromStr(str){
		this.value = []
		for (var i = 0; i < str.length; ++i) {
		  var code = str.charCodeAt(i);
		  this.value = this.value.concat([code]);
		}

	}
}
class tl_int {
	constructor(length,sign){
		this.value = 0
		this.length=length
		this.sign=sign
	}
	set(inArray){
		var res=[]
		for(var i=0; i<this.length;i++){
			res.push(inArray[i] & 0xFF);
		}
		this.value = readBigIntFromBuffer(res,true,this.sign)
		return inArray.slice(this.length)
	}
	get(){
		return readBufferFromBigInt(this.value, this.length, true, this.sign)
	}
	asNum(){
		var res="0x"+this.value.toString(16)
		return parseInt(res)
	}

}
class tl_collator {
	constructor(){
		this.p = 0
		this.q = 0
	}
	set(nump,numq){
		this.p=nump
		this.q=numq
	}
	getp(){
		var res = [];
		var hex = (Array(16).join("0") + this.p.toString(16)).slice(-16);
    	for (var i = 8; i < 16; i += 2) {
        	res.push(parseInt(hex.substr(i, 2),16));
    	}
		return [4].concat(res).concat([0,0,0]);
	}
	getq(){
		var res = [];
		var hex = (Array(16).join("0") + this.q.toString(16)).slice(-16);
    	for (var i = 8; i < 16; i += 2) {
        	res.push(parseInt(hex.substr(i, 2),16));
    	}
		return [4].concat(res).concat([0,0,0]);
	}

}
class TlMessage extends TlLine{
	constructor(){
		super()
		this.auth_key_id=new tl_int(8,false)
		this.message_id=new tl_int(8,false)
		this.message_length=new tl_int(4,false)
		this.tl_constructor=new tl_int(4,false)
		this.message=new tl_array()
	}
}
class UserMsg extends TlLine{
	constructor(){
		super()
		this.message_time=new tl_int(8,false)
		this.message_id=new tl_int(4,false)
		this.message_length=new tl_int(4,false)
		this.message=new tl_array()
	}
}
class msgs_ack extends TlLine{
	constructor(){
		super()
		this.tl_constructor = new tl_int(4,false)
		this.msg_ids = new tl_vector_long()
	}
}

var Msgs_Ack = new msgs_ack()
var ToSend     = new TlMessage()
var GetMessage = new TlMessage()
var UserMessage = new UserMsg()

function process_message(){
	process_message_running=true
	var message_to_send = message_queue({issent:false}).get();
	for(var i = 0 ; i < message_to_send.length; i++){
		var data = []
		var properties_length = Object.keys(message_to_send[i].body).length
		for(var j = 0; j < properties_length; j++){
			var f =  Object.getOwnPropertyNames(message_to_send[i].body[j])[0]
			var t = message_to_send[i].body[j][Object.getOwnPropertyNames(message_to_send[i].body[j])]
			var field_type = Object.getOwnPropertyNames(t)[0]
			var field_value = t[Object.getOwnPropertyNames(t)]
			switch (field_type){
				case "uint4":{
					data = data.concat(readBufferFromBigInt(field_value, 4, true, false))
					break
				}
				case "long":{
					data = data.concat(readBufferFromBigInt(BigInt(field_value), 8, true, true))
					break
				}
				case "string":{
					data = data.concat(readBufferFromString(field_value))
					break
				}
				case "bytes":{
					data = data.concat(readBufferFromArray(field_value))
					break
				}
				default:{
					console.log('Data type '+f[0]+' don\'t includet in mtprotopros.js line ~283')
				}
			}
		}
		UserMessage.message_time.value = newMsgId()
		if((message_id % 2) == 0) message_id++
		UserMessage.message_id.value     = message_id++
		UserMessage.message.value        = data
		UserMessage.message_length.value = UserMessage.message.value.length
		var encrypt_data = encryptMessageData(UserMessage.get())

//console.hex(UserMessage.get())
	
		var to_send  = encryptor.crypt(setLength(encrypt_data))

		socket.send(to_send)
		message_queue(message_to_send[i]).update({body:{},issent:true,message_id:UserMessage.message_time.value.toString(16)})
	}
	var message_to_read = message_queue({isresponse_received:true,isread:false}).get();
	for(var i = 0 ; i < message_to_read.length; i++){
		//send all message
		postMessage([2,message_to_read[i]]);
		message_queue(message_to_read[i]).remove()
	}
	process_message_running=false
}


function Send_Ack(msg_id){
		Msgs_Ack.tl_constructor.value = 0x62d6b459
		Msgs_Ack.msg_ids.value = [msg_id]
		UserMessage.message_time.value = newMsgId()
		UserMessage.message_id.value     = message_id++
		UserMessage.message.value        = Msgs_Ack.get()
		UserMessage.message_length.value = UserMessage.message.value.length
//console.hex(UserMessage.get())
		var encrypt_data = encryptMessageData(UserMessage.get())
		var to_send  = encryptor.crypt(setLength(encrypt_data))
		socket.send(to_send)
}
function message_loop(message){
	var decrypted_message = decryptor.crypt(new Uint8Array(message.data))
	decrypted_message = removeLength(decrypted_message)
	decrypted_message = decryptMessageData(decrypted_message)
	var server_salt = readBigIntFromBuffer(decrypted_message.slice(0,8))
	var server_session_id = readBigIntFromBuffer(decrypted_message.slice(8,16))
	var server_message_id = readBigIntFromBuffer(decrypted_message.slice(16,24))
	var server_seq_no = readUInt32LE(decrypted_message.slice(24,28),0)
	var message_length = readUInt32LE(decrypted_message.slice(28,32),0)
	var message_body = decrypted_message.slice(32, 32+message_length)
	var tl_constructor = readUInt32LE(message_body.slice(0,4),0)
	Send_Ack(server_message_id)
//console.hex(decrypted_message)
//console.hex(message_body)
	switch (tl_constructor){
		case 0xf35c6d01:{ // RPC
			var body_message_id = readBigIntFromBuffer(message_body.slice(4,12))
			var message_to_mark = message_queue({message_id:body_message_id.toString(16)}).first();
			if(message_to_mark != false){
				var body = message_body.slice(12)
				var bytesinflated = possibleUnZip(body)
				message_queue(message_to_mark).update({isresponse_received:true,message_answer:bytesinflated})
			}else{
				message_body = possibleUnZip(message_body.slice(12))
				console.log('Unknown incoming RPC message')
				console.hex(message_body)
			}
			break
		}
		case 0x73f1f8dc:{ //container https://core.telegram.org/mtproto/service_messages // msg_container#73f1f8dc messages:vector message = MessageContainer;
			//console.hex(message_body)
			var msgcount = readUInt32LE(message_body,4)
			message_body = message_body.slice(8)
			for(var i=0;i<msgcount;i++){
				var msg_id = readBigIntFromBuffer(message_body.slice(0,8))
				var seqno = readUInt32LE(message_body,8)
				var bytes =readUInt32LE(message_body,12)
				var body = message_body.slice(16,16+bytes)
				var ret = {}
				message_body = message_body.slice(16+bytes)
				ret.message_answer = possibleUnZip(body)
				postMessage([3,ret]);
			//console.log('message box')
			//console.hex(body)
			}
			break
		}
		default:{
			var ret = {}
			ret.message_answer = possibleUnZip(message_body)
			postMessage([3,ret]);
			//console.log('default message')
			//console.hex(message_body)
		}
	}
	
}

function connect_to_server(){

var obfuscate = crypto.getRandomValues(new Uint8Array(64));
	obfuscate[56] = 0xEF; obfuscate[57] = 0xEF; obfuscate[58] = 0xEF; obfuscate[59] = 0xEF;

var encryptKey  = obfuscate.slice(8 , 8+32 );
var encryptIV   = obfuscate.slice(40, 40+16);
var obfuscatereverse = obfuscate.slice();
    obfuscatereverse = obfuscatereverse.reverse();
var decryptKey  = obfuscatereverse.slice(8, 8+32);
var decryptIV   = obfuscatereverse.slice(40, 40+16);

encryptor = new aesjs.ModeOfOperation(encryptKey, encryptIV);
decryptor = new aesjs.ModeOfOperation(decryptKey, decryptIV);

var encryptedInit = encryptor.crypt(obfuscate);

var finalobfuscate = obfuscate.slice();
    finalobfuscate[56] = encryptedInit[56];
    finalobfuscate[57] = encryptedInit[57];
    finalobfuscate[58] = encryptedInit[58];
    finalobfuscate[59] = encryptedInit[59];

async function connect(){
    return new Promise(function(resolve, reject) {
        socket = new WebSocket(DC[DCindex]);
		socket.binaryType = "arraybuffer";

		socket.onmessage = getmessage;
		socket.onopen =  function()      { resolve(); };
		socket.onerror = function(error) { console.log("Sosket error") ;reject(error); };
	});
};

class req_pq extends TlLine{
	constructor(){
		super()
		this.nonce = new tl_int(16,true)
	}
}
class res_pq extends TlLine{
	constructor(){
		super()
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.pq = new tl_byte()
		this.server_public_key_fingerprints = new tl_vector_long()
	}
}
class p_q_inner_data extends TlLine{
	constructor(){
		super()
		this.p_q_inner_data = new tl_int(4,false)
		this.pq = new tl_byte()
		this.p = new tl_array()
		this.q = new tl_array()
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.new_nonce = new tl_int(32,true)
	}
}
class req_DH_params extends TlLine{
	constructor(){
		super()
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.p = new tl_array()
		this.q = new tl_array()
		this.public_key_fingerprint = new tl_int(8,true)
		this.encrypted_data = new tl_byte()
	}
}
class server_DH_Params extends TlLine{
		constructor(){
		super()
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.encrypted_answer = new tl_byte()
	}
}
class server_DH_inner_data extends TlLine{
	constructor(){
		super()
		this.hashSum = new tl_array()
		this.server_DH_inner_data = new tl_int(4,false)
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.g = new tl_int(4,false)
		this.dh_prime = new tl_byte()
		this.g_a = new tl_byte()
		this.server_time = new tl_int(4,false)
	}
}
class client_DH_inner_data extends TlLine{
	constructor(){
		super()
		this.client_DH_inner_data = new tl_int(4,false)
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.retry_id = new tl_int(8,false)
		this.g_b = new tl_byte()
	}
}
class set_client_DH_param extends TlLine{
	constructor(){
		super()
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.encrypted_data = new tl_byte()
	}
}
class client_DH_params_answer extends TlLine{
	constructor(){
		super()
		this.nonce = new tl_int(16,true)
		this.server_nonce = new tl_int(16,true)
		this.new_nonce_hash = new tl_int(16,true)
	}
}
class initConnection extends TlLine{
	constructor(){
		super()
		this.tl_constructor = new tl_int(4,false)
		this.layer = new tl_int(4,false)
		this.function = new tl_int(4,false)
		this.flag = new tl_int(4,false)
		this.apiId = new tl_int(4,false)
		this.deviceModel = new tl_byte()
		this.systemVersion = new tl_byte()
		this.appVersion = new tl_byte()
		this.langCode = new tl_byte()
		this.langPack = new tl_byte()
		this.systemLangCode = new tl_byte()
		this.query = new tl_int(4,false)
	}
}
class msgs_ack extends TlLine{
	constructor(){
		super()
		this.tl_constructor = new tl_int(4,false)
		this.msg_ids = new tl_vector_long()
	}
}
class UserMsg extends TlLine{
	constructor(){
		super()
		this.message_time=new tl_int(8,false)
		this.message_id=new tl_int(4,false)
		this.message_length=new tl_int(4,false)
		this.message=new tl_array()
	}
}

var gab = null
var ReqPQ	   = new req_pq()
var ResPQ	   = new res_pq()
var collator   = new tl_collator()
var P_Q_inner_data = new p_q_inner_data()
var Req_DH_params = new req_DH_params()
var Server_DH_Params = new server_DH_Params()
var Server_DH_inner_data = new server_DH_inner_data()
var Client_DH_inner_data = new client_DH_inner_data()
var Set_client_DH_param = new set_client_DH_param()
var Client_DH_params_answer = new client_DH_params_answer()
var InitConnection = new initConnection()
var Msgs_Ack = new msgs_ack()
var UserMessage = new UserMsg()

connect().then(
    response => {
		socket.send(finalobfuscate)
		message_id++
		
		ReqPQ.nonce.set(crypto.getRandomValues(new Uint8Array(16)))

		ToSend.auth_key_id.value    = 0
		ToSend.message_id.value     = newMsgId()
		ToSend.tl_constructor.value = 0x60469778
		ToSend.message.value        = ReqPQ.get()
		ToSend.message_length.value = ToSend.message.value.length+4

//console.hex(setLength(ToSend.get()))
		
		var encryptedData = encryptor.crypt(setLength(ToSend.get()))

		socket.send(encryptedData)
		message_id++
		connect_state = 1; //wait (p,q) Authorization
	
	},
    error => alert(`Rejected: ${error}`)
    );


function getmessage(message){
	var decrypted_message = decryptor.crypt(new Uint8Array(message.data))
	decrypted_message = removeLength(decrypted_message)

//console.hex(decrypted_message)

	switch (connect_state){
		case 1: {//resPQ
			decrypted_message = GetMessage.auth_key_id.set(decrypted_message)
			decrypted_message = GetMessage.message_id.set(decrypted_message)
			decrypted_message = GetMessage.message_length.set(decrypted_message)
			decrypted_message = GetMessage.tl_constructor.set(decrypted_message)
			if(GetMessage.tl_constructor.value != 0x05162463) throw Error('resPQ error');

//console.hex(decrypted_message)
			
			decrypted_message = ResPQ.nonce.set(decrypted_message)
			decrypted_message = ResPQ.server_nonce.set(decrypted_message)
			decrypted_message = ResPQ.pq.set(decrypted_message)
			decrypted_message = ResPQ.server_public_key_fingerprints.set(decrypted_message)
			if(ReqPQ.nonce.value != ResPQ.nonce.value) throw Error('ResPQ <> ReqPQ error');

			console.log("Calculate pq")
			var {p,q} = factorize(ResPQ.pq.asNum())
			collator.set(p,q)
		
//console.hex(collator.getp())
//console.hex(collator.getq())
			
			P_Q_inner_data.p_q_inner_data.value = 0x83c95aec
			P_Q_inner_data.pq.fromNum(ResPQ.pq.asNum())
			P_Q_inner_data.p.set(collator.getp())
			P_Q_inner_data.q.set(collator.getq())
			P_Q_inner_data.nonce.value = ResPQ.nonce.value
			P_Q_inner_data.server_nonce.value = ResPQ.server_nonce.value
			P_Q_inner_data.new_nonce.set(Array.from(crypto.getRandomValues(new Uint8Array(32))))
			
			var RSAInputData = []
			var sha1 = Array.from(Sha1(P_Q_inner_data.get()))
			var data = P_Q_inner_data.get()
			var rand = Array.from(crypto.getRandomValues(new Uint8Array(235-data.length)))
			RSAInputData = RSAInputData.concat(sha1,data,rand)

//console.hex(RSAInputData)
			
			for (var _i = 0, _publicKeys = publicKeys; _i < _publicKeys.length; _i++) {
				var pub = _publicKeys[_i];
				addKey(pub);
			}

			var rsa_encrypted = RSA(RSAInputData,_serverKeys[ResPQ.server_public_key_fingerprints.value[0]])

//console.hex(rsa_encrypted)
			
	
			Req_DH_params.nonce.value = ResPQ.nonce.value
			Req_DH_params.server_nonce.value = ResPQ.server_nonce.value
			Req_DH_params.p.value = P_Q_inner_data.p.value
			Req_DH_params.q.value = P_Q_inner_data.q.value
			Req_DH_params.public_key_fingerprint.set(ResPQ.server_public_key_fingerprints.get(0))
			Req_DH_params.encrypted_data.value = rsa_encrypted
			
//console.hex(Req_DH_params.get())
			
			ToSend.auth_key_id.value    = 0
			ToSend.message_id.value     = newMsgId()
			ToSend.tl_constructor.value = 0xd712e4be	
			ToSend.message.value        = Req_DH_params.get()
			ToSend.message_length.value = ToSend.message.value.length+4

//console.hex(setLength(ToSend.get()))
		
			encryptedData = encryptor.crypt(setLength(ToSend.get()))

			socket.send(encryptedData)
			message_id++
			connect_state = 2; //wait Request to Start Diffie-Hellman Key Exchange
			break
		}
		case 2: { // Server_DH_Param
			decrypted_message = GetMessage.auth_key_id.set(decrypted_message)
			decrypted_message = GetMessage.message_id.set(decrypted_message)
			decrypted_message = GetMessage.message_length.set(decrypted_message)
			decrypted_message = GetMessage.tl_constructor.set(decrypted_message)
			if(GetMessage.tl_constructor.value != 0xd0e8075c) throw Error('Server_DH_Param error');

			decrypted_message = Server_DH_Params.nonce.set(decrypted_message)
			decrypted_message = Server_DH_Params.server_nonce.set(decrypted_message)
			decrypted_message = Server_DH_Params.encrypted_answer.set(decrypted_message)

//console.hex(Server_DH_Params.encrypted_answer.value)
			
			var {key, iv} = generateKeyDataFromNonce(Server_DH_Params.server_nonce.get(), P_Q_inner_data.new_nonce.get())
			decrypted_message = decryptIge(Server_DH_Params.encrypted_answer.value, key, iv)
//console.hex(decrypted_message)

								Server_DH_inner_data.hashSum.set(decrypted_message.slice(0,20))
			decrypted_message = decrypted_message.slice(20)
			decrypted_message = Server_DH_inner_data.server_DH_inner_data.set(decrypted_message)
			if(Server_DH_inner_data.server_DH_inner_data.value != 0xb5890dba) throw Error('Server_DH_inner_data error');
			decrypted_message = Server_DH_inner_data.nonce.set(decrypted_message)
			decrypted_message = Server_DH_inner_data.server_nonce.set(decrypted_message)
			decrypted_message = Server_DH_inner_data.g.set(decrypted_message)
			decrypted_message = Server_DH_inner_data.dh_prime.set(decrypted_message)
			decrypted_message = Server_DH_inner_data.g_a.set(decrypted_message)
			decrypted_message = Server_DH_inner_data.server_time.set(decrypted_message)
	
//console.hex(decrypted_message)
			
			Client_DH_inner_data.client_DH_inner_data.value = 0x6643b654
			Client_DH_inner_data.nonce.value = Server_DH_inner_data.nonce.value
			Client_DH_inner_data.server_nonce.value = Server_DH_inner_data.server_nonce.value
			Client_DH_inner_data.retry_id.value = 0
			var b = readBigIntFromBuffer(crypto.getRandomValues(new Uint8Array(256)))
			var dhPrime = readBigIntFromBuffer(Server_DH_inner_data.dh_prime.value, false, false);
			var ga = readBigIntFromBuffer(Server_DH_inner_data.g_a.value, false, false);
				timeOffset = Server_DH_inner_data.server_time.asNum() - Math.floor(new Date().getTime() / 1000);
			var gb = modExp(Server_DH_inner_data.g.value, b, dhPrime) 
				gab = modExp(ga, b, dhPrime);
			Client_DH_inner_data.g_b.fromNum(gb)

//console.hex(Client_DH_inner_data.get())
			
			var clientDdhInnerHashed = [].slice.call(Sha1(Client_DH_inner_data.get()))
				clientDdhInnerHashed = clientDdhInnerHashed.concat(Client_DH_inner_data.get())
				clientDdhInnerHashed = clientDdhInnerHashed.concat([].slice.call(crypto.getRandomValues(new Uint8Array(16-clientDdhInnerHashed.length % 16))))
			var clientDhEncrypted = encryptIge(clientDdhInnerHashed, key, iv)

			Set_client_DH_param.nonce.value = Client_DH_inner_data.nonce.value
			Set_client_DH_param.server_nonce.value = Client_DH_inner_data.server_nonce.value
			Set_client_DH_param.encrypted_data.value = clientDhEncrypted

			ToSend.auth_key_id.value    = 0
			ToSend.message_id.value     = newMsgId()
			ToSend.tl_constructor.value = 0xf5045f1f
			ToSend.message.value        = Set_client_DH_param.get()
			ToSend.message_length.value = ToSend.message.value.length+4

//console.hex(setLength(ToSend.get()))
		
			encryptedData = encryptor.crypt(setLength(ToSend.get()))

			socket.send(encryptedData)
			message_id++
			connect_state = 3; //wait server verifies that auth_key_hash is unique.
			break
		}
		case 3: { //The key is unique.
			decrypted_message = GetMessage.auth_key_id.set(decrypted_message)
			decrypted_message = GetMessage.message_id.set(decrypted_message)
			decrypted_message = GetMessage.message_length.set(decrypted_message)
			decrypted_message = GetMessage.tl_constructor.set(decrypted_message)
			if(GetMessage.tl_constructor.value != 0x3bcbf734) throw Error('DH_params_answer error');
								GetMessage.message.set(decrypted_message)
			
			decrypted_message = Client_DH_params_answer.nonce.set(GetMessage.message.value)
			decrypted_message = Client_DH_params_answer.server_nonce.set(decrypted_message)
								Client_DH_params_answer.new_nonce_hash.set(decrypted_message)
//console.hex(Client_DH_params_answer.get())

			var bits = gab.toString(2).length;
			var byteLength = Math.floor((bits + 8 - 1) / 8);
			auth_key._key = readBufferFromBigInt(BigInt(gab), byteLength, false, false);
			var key_sha1 = Sha1(auth_key._key)
			auth_key.auxHash = readBigIntFromBuffer(key_sha1.slice(0,8), true, false);
			auth_key.keyId = readBigIntFromBuffer(key_sha1.slice(12,20), true, false);
			var newNonce = P_Q_inner_data.new_nonce.get()

			var auxHash_hight = parseInt(auth_key.auxHash.toString(16).substring(0,8),16)
			if ((auxHash_hight & 0x80000000) != 0) {  auxHash_hight = auxHash_hight - 0x100000000;  }
			var auxHash_low=parseInt(auth_key.auxHash.toString(16).substring(8,16),16)
			if ((auxHash_low & 0x80000000) != 0) {  auxHash_low = auxHash_low - 0x100000000;  }
			var packed = [].concat([1])
			packed = packed.concat(readBufferFromBigInt(auxHash_low, 4, true, true))
			packed = packed.concat(readBufferFromBigInt(auxHash_hight, 4, true, true))
			var data = newNonce.concat(packed)
			var shaData = Sha1(data).slice(4, 20);
			var newNonceHash = readBigIntFromBuffer(shaData, true, true);
			if( newNonceHash != Client_DH_params_answer.new_nonce_hash.value) throw Error(' Все было хорошо но что то пошло не так ')
			var srv_nonce = readBufferFromBigInt(P_Q_inner_data.server_nonce,16,false,true).slice(0,8)
			var srv_n_nonce = readBufferFromBigInt(P_Q_inner_data.new_nonce,32,false,true).slice(0,8)
			
			message_id = 1
			InitConnection.tl_constructor.value = 0xda9b0d0d //INPUT_METHOD_INVALID_ 3671788813 _246134
			InitConnection.layer.value = 105
			InitConnection.function.value = 0x785188b8
			InitConnection.flag.value = 0
			InitConnection.apiId.value = api_id
			InitConnection.deviceModel.fromStr(deviceModel)
			InitConnection.systemVersion.fromStr(systemVersion)
			InitConnection.appVersion.fromStr(appVersion)
			InitConnection.langCode.fromStr(langCode)
			InitConnection.langPack.value = []
			InitConnection.systemLangCode.fromStr(systemLangCode)
			InitConnection.query.value = 0xc4f9186b
	
			UserMessage.message_time.value = newMsgId()
			UserMessage.message_id.value     = message_id++
			UserMessage.message.value        = InitConnection.get()
			UserMessage.message_length.value = UserMessage.message.value.length
			var encrypt_data = encryptMessageData(UserMessage.get())

//console.hex(UserMessage.get())
	
			var to_send  = encryptor.crypt(setLength(encrypt_data))

			socket.send(to_send)
			connect_state = 4
			break
		}
		case 4:{
			decrypted_message = decryptMessageData(decrypted_message)
    		_salt = readBigIntFromBuffer(decrypted_message.slice(0,8))

			var RemoteMsgId = readBigIntFromBuffer(decrypted_message.slice(16,24),true,true)
				Msgs_Ack.tl_constructor.value = 0x62d6b459
				Msgs_Ack.msg_ids.value = [RemoteMsgId]
			UserMessage.message_time.value = newMsgId()
			UserMessage.message_id.value     = message_id++
			UserMessage.message.value        = Msgs_Ack.get()
			UserMessage.message_length.value = UserMessage.message.value.length
//console.hex(UserMessage.get())
			var encrypt_data = encryptMessageData(UserMessage.get())
			var to_send  = encryptor.crypt(setLength(encrypt_data))
			socket.send(to_send)			
			
			if(readBigIntFromBuffer(decrypted_message.slice(32,36)) == 0xedab447b){ //bad salt, resend request
				InitConnection.tl_constructor.value = 0xda9b0d0d
				InitConnection.layer.value = 105
				InitConnection.function.value = 0x785188b8
				InitConnection.flag.value = 0
				InitConnection.apiId.value = api_id
				InitConnection.deviceModel.fromStr(deviceModel)
				InitConnection.systemVersion.fromStr(systemVersion)
				InitConnection.appVersion.fromStr(appVersion)
				InitConnection.langCode.fromStr(langCode)
				InitConnection.langPack.value = []
				InitConnection.systemLangCode.fromStr(systemLangCode)
				InitConnection.query.value = 0xc4f9186b
//TODO add message to message-queue
				UserMessage.message_time.value = newMsgId()
				UserMessage.message_id.value     = message_id++
				UserMessage.message.value        = InitConnection.get()
				UserMessage.message_length.value = UserMessage.message.value.length
				var encrypt_data = encryptMessageData(UserMessage.get())

	//console.hex(UserMessage.get())

				var to_send  = encryptor.crypt(setLength(encrypt_data))

				socket.send(to_send)
				message_queue.insert({id:"GetConfig",body:{[0]:{tl_constructor:{uint4:0}}},issent:true,message_id:UserMessage.message_time.value.toString(16),
    					isresponse_received:false,	isread:false})
			}
			connect_state = 5; //wait config
			break
		}
		case 5:{
			decrypted_message = decryptMessageData(decrypted_message)
    		_salt = readBigIntFromBuffer(decrypted_message.slice(0,8))

			var RemoteMsgId = readBigIntFromBuffer(decrypted_message.slice(16,24),true,true)
				Msgs_Ack.tl_constructor.value = 0x62d6b459
				Msgs_Ack.msg_ids.value = [RemoteMsgId]
			UserMessage.message_time.value = newMsgId()
			UserMessage.message_id.value     = message_id++
			UserMessage.message.value        = Msgs_Ack.get()
			UserMessage.message_length.value = UserMessage.message.value.length
//console.hex(UserMessage.get())
			var encrypt_data = encryptMessageData(UserMessage.get())
			var to_send  = encryptor.crypt(setLength(encrypt_data))
			socket.send(to_send)	
			if(readBigIntFromBuffer(decrypted_message.slice(32,36)) == 0x9ec20908){ //new session created
				postMessage(ok_message);
				connect_state = 6; //server Ok
				socket.onmessage=message_loop;
			}
			break
		}
	}
}

}

//todo https://core.telegram.org/mtproto/mtproto-transports#abridged
function setLength(arr){
	arr.concat([].slice.call(new Uint8Array(4-arr.length % 4)))
	if((arr.length >> 2) < 0x7f){
		return [(arr.length >> 2)].concat(arr)
	}else{
		//
	}
}
function removeLength(arr){
	if(arr[0] == 0x7f){
		return arr.slice(4)
	}else{
		return arr.slice(1)
	}
}
function decryptMessageData(body) {
	if (body.length < 8) { throw Error('Message <8 bytes ');  }

	const keyId = readBigIntFromBuffer(body.slice(0, 8))

	if (keyId !== auth_key.keyId) { throw Error('Server replied with an invalid auth key')  }

	const msgKey = [].slice.call(body.slice(8, 24))
	var _calcKeyS = _calcKey(auth_key._key, msgKey, false)
	body = decryptIge(body.slice(24),  _calcKeyS.key, _calcKeyS.iv)

	const ourKey = Sha256(auth_key._key.slice(96, 96 + 32).concat(body))

	if (!checkArrays(msgKey,ourKey.slice(8, 24))) {  throw new Error('Received msg_key doesn\'t match with expected one')  }
	return body
}
function encryptMessageData(data) {
	var _dat = [].concat(readBufferFromBigInt(_salt, 8))
		_dat = _dat.concat(readBufferFromBigInt(_id, 8))
		_dat = _dat.concat(data)
		data = _dat
	var padding = [].slice.call(crypto.getRandomValues(new Uint8Array(mod(-(data.length + 12), 16) + 12)))
	var toHash = [].concat(auth_key._key.slice(88, 88 + 32))
		toHash = toHash.concat(data)
		toHash = toHash.concat(padding)
	var msgKeyLarge = Sha256(toHash);

	var msgKey = msgKeyLarge.slice(8, 24);

	var _calcKeyS = _calcKey(auth_key._key, msgKey, true)

	var keyId = readBufferFromBigInt(auth_key.keyId, 8);
	var ret = [].concat(keyId)
		ret = ret.concat(msgKey)
		ret = ret.concat(encryptIge(data.concat( padding), _calcKeyS.key, _calcKeyS.iv))
	return ret
}
function _calcKey(authKey, msgKey, client) {
	var x = client === true ? 0 : 8;
	var sha256a = Sha256(msgKey.concat(authKey.slice(x, x + 36)));
	var sha256b = Sha256(authKey.slice(x + 40, x + 76).concat(msgKey));
	var key = sha256a.slice(0, 8).concat(sha256b.slice(8, 24));
		key = key.concat(sha256a.slice(24, 32));
	var iv = sha256b.slice(0, 8).concat( sha256a.slice(8, 24));
		iv = iv.concat(sha256b.slice(24, 32));
	return { key: key, iv: iv  };
}
function mod(n, m) {
	return (n % m + m) % m;
}
function possibleUnZip(body){
	var tl_body_constructor = readUInt32LE(body)
	if(tl_body_constructor == 0x3072cfa1) { //gzippacked unpack it string 4 byte length "fe" => l>254 => skip 4 byte
		var bytesinflated =null
		if(body[4] == 0xfe){
			bytesinflated = inflate(body.slice(4+4+10))
		} else {
			bytesinflated = inflate(body.slice(4+1+10))
		}
		return bytesinflated
	}else{
		return body
	}
}
