include('constructs.js');
include('utils.js');
include('func.js');
include('settings.js');
include('requested_message.js')
include('not_requested_message.js')

const userlist = document.getElementById('users_list')
/*var tmplist = {125:BigInt(700n),150:BigInt(-298798798687687687658870n)}
for(var l=0;l<Object.keys(tmplist).length;l++){
var opt = document.createElement('option');
opt.appendChild( document.createTextNode(Object.keys(tmplist)[l]));
opt.value = tmplist[Object.keys(tmplist)[l]] 
userlist.appendChild(opt); 
}
*/

const mtproto_state = document.getElementById('mtprotoresult')
const tg_out = document.getElementById('tgresult')
tg_out.innerHTML= "=<br>"
var dataC = localStorage.getItem('dc')
if(dataC == null) dataC = "1"
//localStorage.setItem('dc',dataC)

var M2Hash = localStorage.getItem('M2')
if(M2Hash == null) M2Hash = null
//localStorage.setItem('M2',M2Hash)

//====================array for requested message handler================
var requested_msg = {}
//====================array for incoming message handler================
var not_requested_msg = {}

const mainloopdelay = 10
var mainlooptimer = null
var mtprotoproc = null
var mode = 0 //start
var phonenum=null
var _phonenum=null
var _phonehash = null
var code=null
var password=null
var _password=""
var SPR=null
var tl_request=null
var testcounter0= 0

function restore_input(){
	document.getElementById('phonelabel').hidden=true
	document.getElementById('phonelabel').style=""
	document.getElementById('codelabel').hidden=true
	document.getElementById('codelabel').style=""
	document.getElementById('getContacts').hidden=true
	document.getElementById('getContacts').style=""
}
function sendphonenum(number){
	//auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
	var i = 0
	phonenum={id:"PhoneNumber",body:{[i++]:{tl_constructor:{uint4:0xa677244f}},
									[i++]:{phone_number:{string:number.replace("+","")}},
									[i++]:{api_id:{uint4:api_id}},
									[i++]:{api_hash:{string:api_hash}},
									[i++]:{settings:{uint4:0xdebebe83}},
									[i++]:{flags:{uint4:0}}}} 
	document.getElementById('phonelabel').style="pointer-events: none; opacity: 0.4;" 
	_phonenum = number.replace("+","")
	mode = 3
}
function sendcode(phonecode){
	//auth.signIn#bcd51581 phone_number:string phone_code_hash:string phone_code:string = auth.Authorization;
	var i = 0
	code={id:"PhoneCode",body:{[i++]:{tl_constructor:{uint4:0xbcd51581}},
							  [i++]:{phone_number:{string:_phonenum}},
		  					  [i++]:{phone_code_hash:{string:_phonehash}},
							  [i++]:{phone_code:{string:phonecode}}}}
	document.getElementById('codelabel').style="pointer-events: none; opacity: 0.4;" 
	mode = 6
}
function getPassword(){
	//account.getPassword#548a30f5 = account.Password;
	var i = 0
	password={id:"GetPassword",body:{[i++]:{tl_constructor:{uint4:0x548a30f5}}}}
	mode = 61
}
function createPassHash(algo){
	//inputCheckPasswordSRP #d27ff082 srp_id: long A: bytes M1: bytes = InputCheckPasswordSRP ; 
	var i = 0
	if(M2Hash == null){
		_password =  prompt('Enter password');
		if(_password == null) _password=""
		var hash1 = Sha256(algo.current_algo.salt1.concat(readArrayFromString(_password).concat(algo.current_algo.salt1)))
		var hash2 = Sha256(algo.current_algo.salt2.concat(hash1.concat(algo.current_algo.salt2)))
		var hash3 = pbkdf2(hash2, algo.current_algo.salt1, 100000)
		var M2 = Sha256(algo.current_algo.salt2.concat(hash3.concat(algo.current_algo.salt2)));
		M2Hash = M2
		localStorage.setItem('M2',M2Hash)
	} else {
		M2=JSON.parse("[" + M2Hash + "]")
	}
	var p = readBigIntFromBuffer(algo.current_algo.p, false)
	var g = algo.current_algo.g
	var B = readBigIntFromBuffer(algo.srp_B, false)

	var x = readBigIntFromBuffer(M2, false)
	var pForHash = new Array(256-algo.current_algo.p.length).concat(algo.current_algo.p)
	var gForHash = readBufferFromBigInt(g, 256, false)
	var bForHash = new Array(256-algo.srp_B.length).concat(algo.srp_B)
	var gX = modExp(BigInt(g), x, p)
	var k = readBigIntFromBuffer(Sha256(pForHash.concat(gForHash)), false)
	var kgX = k * gX % p

	var _a = readBigIntFromBuffer(algo.secure_random, false)
	var A = modExp(BigInt(g), _a, p)
	var aForHash = readBufferFromBigInt(A, 256, false)

	var u = readBigIntFromBuffer(Sha256(aForHash.concat(bForHash)), false)
	var gB = (B - kgX) % p
	var ux = u * x
	var aUx = _a + ux
	var S = modExp(gB, aUx, p)
	var K = Sha256(readBufferFromBigInt(S, 256, false))
	var pFH = Sha256(algo.current_algo.p)
	var gFH = Sha256(gForHash)
	for (var j = 0; j < 32; j++) {
		pFH[j] = pFH[j] ^ gFH[j];
	}
	var M1 = Sha256(pFH.concat(Sha256(algo.current_algo.salt1).concat(Sha256(algo.current_algo.salt2).concat(aForHash.concat(bForHash.concat(K))))));

	//auth.checkPassword#d18b4d16 password:InputCheckPasswordSRP = auth.Authorization;
	SPR={id:"inputCheckPasswordSRP",body:{[i++]:{tl_constructor:{uint4:0xd18b4d16}},
										[i++]:{password:{uint4:0xd27ff082}},
										[i++]:{srp_id:{long:algo.srp_id.toString()}},
										[i++]:{A:{bytes:aForHash}},
										[i++]:{M1:{bytes:M1}}}}
	mode = 62
}
function mainloop(){
	console.log("mainloop event")
    testcounter0++
	switch (mode){
		case 0: {
			    mode = 1 //wait connect
			    mtprotoproc.postMessage(['connect',dataC])
			    break
		}
		case 3:{
			    mode = 4 //wait phone code
			    mtprotoproc.postMessage(['message_to_queue',phonenum,'Send phone num..'])
			    break
		}
		case 6:{
			    mode = 7 //wait signin
			    mtprotoproc.postMessage(['message_to_queue',code,'Send phone code..'])
			    break
		}
		case 61:{
				mode = 71 //wait passw request
			    mtprotoproc.postMessage(['message_to_queue',password,'Request password for 2FA..'])
				break
		}
		case 62:{
				mode = 72 //wait passw request
			    mtprotoproc.postMessage(['message_to_queue',SPR,'Check password + connect 2FA..'])
				break
		}
		case 8:{
			    mode = 7 //send request and wait answer
			    mtprotoproc.postMessage(['message_to_queue',tl_request,'User request '+tl_request.id])
			    break
		}
	}
	if(testcounter0 % 10 == 0){mtprotoproc.postMessage(['process_message_queue'])}
	if(mode == 1) mtproto_state.innerHTML = 'Connecting to server '+dataC+' ... '+testcounter0
	start()
}
function start(){
	mainlooptimer = setTimeout(mainloop, mainloopdelay)
}

if(window.Worker) {
	
	mtprotoproc = new Worker("mtprotoproc.js")
	mtprotoproc.onmessage = get_mtprotoprocdata
	
	start()
	
}else{
	console.log('Your browser doesn\'t support web workers.')
}


function get_mtprotoprocdata(e){
	switch (e.data[0]){
		case 1:{
				mtproto_state.innerHTML = "Wait phone num"
				mode = 2 //connected
				document.getElementById('phonelabel').hidden=false
				break
				}
		case 2:{//answer from mtproto
//				mtproto_state.innerHTML = e.data[1]
//				console.hex(e.data[1].message_answer)
				var ob = parse_answer(e.data[1].message_answer)
				switch (e.data[1].id) {
					case "PhoneNumber" :{
						if(ob.error == undefined){
							mtproto_state.innerHTML = "Wait SMS code"
							mode = 5 //wait sms code
							_phonehash = ob.phone_code_hash
							document.getElementById('codelabel').hidden=false
						}else{
							if(ob.error == 303){ //migrate telephone
								mtproto_state.innerHTML = "Reconnect to valid DC"
								mode = 0 //reconnect to another DC
								dataC = ob.error_text.slice(-1)
								localStorage.setItem('dc',dataC)
								testcounter0 = 0
								restore_input()
							}else{
//							if(ob.error == 406){ //password flood
								mtproto_state.innerHTML = ob.error_text
							}
						}
						break
					}
					case "PhoneCode": {
						if(ob.error == undefined){
							mtproto_state.innerHTML = "login Ok"
							tg_out.innerHTML += "<br><br> == User =="
							tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob,stringifyReplacer)) + "<br>"
							document.getElementById('getContacts').hidden=false
							document.getElementById('phonelabel').hidden=true
							document.getElementById('codelabel').hidden=true
							//mode = 10 //connected to server and logined
						}else{
							if(ob.error == 401){ //SESSION_PASSWORD_NEEDED
								mtproto_state.innerHTML = "2FA connect"
								//2FA
								getPassword()
							}
						}
						break
					}	
					case "GetPassword":{
						mtproto_state.innerHTML = "Wait 2FA password"
						createPassHash(ob)
						break
					}
					case "inputCheckPasswordSRP":{
						if(ob.error == undefined){
							mtproto_state.innerHTML = "login Ok"
							tg_out.innerHTML += "<br><br> == User =="
							tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob,stringifyReplacer)) + "<br>"
							document.getElementById('getContacts').hidden=false
							document.getElementById('phonelabel').hidden=true
							document.getElementById('codelabel').hidden=true
							//mode = 10 //connected to server and logined
						} else {
							if(ob.error == 400){ //SESSION_PASSWORD_BAD
								mtproto_state.innerHTML = ob.error_text+" Bad password? may be reconnect"
							}
						}
						break
					}
					default: {
						if(requested_msg[e.data[1].id] != undefined) {
							requested_msg[e.data[1].id](ob)
						} else {
							console.log("handler for "+e.data[1].id+" not found in requested_messages.js")
						}
						break
					}
				}
				break
				}
		case 3:{//message from mtproto
				var ob = parse_answer(e.data[1].message_answer)
				var tl_constructor = "0x0"
				if(ob.tl_constructor !== undefined) tl_constructor= "0x"+ob.tl_constructor.toString(16)
//				switch (tl_constructor) {
//todo remove swutch in no need
//					default:{
						if(not_requested_msg[tl_constructor] != undefined) {
							not_requested_msg[tl_constructor](ob)
						} else {
							console.log("handler for incoming message "+tl_constructor+" not found in not_requested_messages.js")
						}
//						break
//					}
//				}

//todo for test remove
tg_out.scrollTop = tg_out.scrollHeight;
				break
				}
		case 10:{
				// e.data[1] - current mtproto state 
				// 0 - init
				// 1 - wait (p,q) Authorization
				// 2 - wait Request to Start Diffie-Hellman Key Exchange
				// 3 - wait server verifies that auth_key_hash is unique.
				// 4 - connected to server
				break
				}
	}
}

function parse_answer(body){
	var isrec = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
	var vector_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "unknown_vector"
	var res = null
	var ret = null
	var len = 0
	var _flags = 0
	var request = null
	var value = 0
	var tl_constructor = readUInt32LE(body,0)
	body = body.slice(4) //remove tl_constructor
	_flags = readUInt32LE(body, 0)
	request = getrequest(tl_constructor,_flags,vector_type)
	if( request == null ){ //if constructor not have fields
		len = body.length
		ret = tl_constructor
		console.hex(body) //temporary log empty request
	} else {
		res = pick_out(body,request)
		len = res.arr.length
		ret = res.out
	}

	if(isrec) return {len, ret}
	ret.tl_constructor = tl_constructor
	return ret
}

function pick_out(arr,tl_info){
	var out = {}
	var length = Object.keys(tl_info).length
	for(var j = 0; j < length; j++){
		var properties = Object.getOwnPropertyNames(tl_info[j])[0]
		var properties_type = tl_info[j][Object.getOwnPropertyNames(tl_info[j])]
		switch (properties_type){
			case "uint4":{
				out[properties] = readUInt32LE(arr, 0)
				arr = arr.slice(4)
				break
			}
			case "int":{
				out[properties] = readUInt32LE(arr, 0)
				arr = arr.slice(4)
				break
			}
			case "#":{
				out[properties] = readUInt32LE(arr, 0)
				arr = arr.slice(4)
				break
			}
			case "long":{
				out[properties] = readBigIntFromBuffer(arr.slice(0,8), true, true)
				arr = arr.slice(8)
				break
			}
			case "bool":{
				out[properties] = (readUInt32LE(arr, 0)==0x997275b5) ? true : false
				arr = arr.slice(4)
				break
			}
			case "string":{
				out[properties] = readString(arr)
				arr = arr.slice(lengthStringOrBytes(arr))
				break
			}
			case "bytes":{
				out[properties] = readBytes(arr)
				arr = arr.slice(lengthStringOrBytes(arr))
				break
			}
			case "true":{
				out[properties] = true
				break
			}
			default:{
				if(properties_type.includes('Vector')){
					var match = properties_type.match(/<(.*)>/)
					if(match) {
						res = parse_answer(arr,true,match[1])
					} else {
						res = parse_answer(arr,true)
					}
				}else{
					res = parse_answer(arr,true)
				}
				out[properties] = res.ret
				arr = arr.slice(-res.len)
			}
		}
	}	
	return {arr, out}
}
function include(url) {
  var s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.async = false; 
  s.setAttribute("src", url);
  document.body.appendChild(s);
}
isObject = function(a) {
    return (!!a) && (a.constructor === Object);
};