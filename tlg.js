include('constructs.js');
include('func.js');
include('settings.js');


const mtproto_state = document.getElementById('mtprotoresult')
const tg_out = document.getElementById('tgresult')
tg_out.innerHTML= "=<br>"
var dataC = localStorage.getItem('dc')
if(dataC == null) dataC = "1"
localStorage.setItem('dc',dataC)

const mainloopdelay = 10
var mainlooptimer = null
var mtprotoproc = null
var mode = 0 //start
var phonenum=null
var _phonenum=null
var _phonehash = null
var code=null
var tl_request=null
var testcounter0= 0

function restore_input(){
	document.getElementById('phone').disabled=false
	document.getElementById('phoneSend').disabled=false
	document.getElementById('code').disabled=false
	document.getElementById('codeSend').disabled=false
	document.getElementById('getContacts').disabled=false
}
function sendphonenum(number){
	//auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
	//todo numerate properties
	phonenum={id:"PhoneNumber",body:{tl_constructor:{uint4:0xa677244f},
									 phone_number:{string:number.replace("+","")},
									 api_id:{uint4:api_id},
									 api_hash:{string:api_hash},
									 settings:{uint4:0xdebebe83},
									 flags:{uint4:0}}} 
//	phonenum={id:"nearestdc",body:{tl_constructor:{uint4:0x1fb33026}}}
	document.getElementById('phone').disabled=true
	document.getElementById('phoneSend').disabled=true
	_phonenum = number.replace("+","")
	mode = 3
}
function sendcode(phonecode){
	//auth.signIn#bcd51581 phone_number:string phone_code_hash:string phone_code:string = auth.Authorization;
	//todo numerate properties
	code={id:"PhoneCode",body:{tl_constructor:{uint4:0xbcd51581},
							  phone_number:{string:_phonenum},
							  phone_code_hash:{string:_phonehash},
							  phone_code:{string:phonecode}}}
	document.getElementById('code').disabled=true
	document.getElementById('codeSend').disabled=true
	mode = 6
}
function getContacts(){
	//todo numerate properties
    tl_request={id:"GetContacts",body:{tl_constructor:{uint4:0xc4a353ee}}}
	mode = 8
	
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
		case 8:{
			    mode = 7 //wait answer
			    mtprotoproc.postMessage(['message_to_queue',tl_request,'Request contact list..'])
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
				mtproto_state.innerHTML = e.data[1]
				mode = 2 //connected
				document.getElementById('phonelabel').hidden=false
				document.getElementById('phone').hidden=false
				document.getElementById('phoneSend').hidden=false
				break
				}
		case 2:{//answer from mtproto
				mtproto_state.innerHTML = e.data[1]
//				console.hex(e.data[1].message_answer)
				var ob = parse_answer(e.data[1].message_answer)
				switch (e.data[1].id) {
					case "PhoneNumber" :{
						mtproto_state.innerHTML = JSON.stringify(ob)
						if(ob.error == undefined){
							mode = 5 //wait sms code
							_phonehash = ob.phone_code_hash
							document.getElementById('codelabel').hidden=false
							document.getElementById('code').hidden=false
							document.getElementById('codeSend').hidden=false
						}else{
							if(ob.error == 303){ //migrate telephone
								mode = 0 //reconnect to another DC
								dataC = ob.error_text.slice(-1)
								localStorage.setItem('dc',dataC)
								document.getElementById('phonelabel').hidden=true
								document.getElementById('phone').hidden=true
								document.getElementById('phoneSend').hidden=true
								testcounter0 = 0
								restore_input()
							}
						}
						break
					}
					case "PhoneCode": {
						mtproto_state.innerHTML = "login Ok"
						tg_out.innerHTML += "name: "+ob.user.first_name+"<br>"
						tg_out.innerHTML += "last name: "+ob.user.last_name+"<br>"
						tg_out.innerHTML += "user name: "+ob.user.username+"<br>"
						tg_out.innerHTML += "phone: "+ob.user.phone+"<br>"
						tg_out.innerHTML += "status: "+ob.user.status.was_online+"<br>"

						document.getElementById('getContacts').hidden=false
						document.getElementById('phonelabel').hidden=true
						document.getElementById('phone').hidden=true
						document.getElementById('phoneSend').hidden=true
						document.getElementById('codelabel').hidden=true
						document.getElementById('code').hidden=true
						document.getElementById('codeSend').hidden=true
						//mode = 10 //connected to server and logined
						break
					}					
					case "GetContacts": {
						for(var i=1;i<ob[0];i++){
							if(isObject(ob[i])){
								tg_out.innerHTML += "<br>"+i+ " user_id " + ob[i].user_id
								if(ob[i].status.was_online !== undefined){
									tg_out.innerHTML += " was online " +ob[i].status.was_online
								}
								if(ob[i].status.expires !== undefined){
									tg_out.innerHTML += " online now. expiried " +ob[i].status.expires
								}
							}
						}
						tg_out.innerHTML += "<br>"
//todo for test remove
tg_out.scrollTop = tg_out.scrollHeight;
						
						break
					}					
				}
				break
				}
		case 3:{//message from mtproto
				var ob = parse_answer(e.data[1].message_answer)
				var tl_constructor = 0
				if(ob.tl_constructor !== undefined) tl_constructor= ob.tl_constructor
				switch (tl_constructor) {
//todo optimise all if()						
					case 0x78d4dec1:{//updateShort#78d4dec1
						if(ob.update !== undefined && ob.update.status !== undefined && ob.update.status.was_online !== undefined){
							tg_out.innerHTML += ob.update.user_id + " was online " +ob.update.status.was_online +"<br>"
						}
						if(ob.update !== undefined && ob.update.status !== undefined && ob.update.status.expires !== undefined){
							tg_out.innerHTML += ob.update.user_id + " online now. expiried " +ob.update.status.expires +"<br>"
						}
						break
					}
					case 0x74ae4240:{//updates#74ae4240
						if(ob.updates !== undefined){ 
							for(var i=0;i<ob.updates[0];i++){
								if(ob.updates[i+1].messages !== undefined){
									for(var j=0;j<ob.updates[i+1].messages[0];j++){
										tg_out.innerHTML += "x delete message num " + ob.updates[i+1].messages[j+1]+"<br>"
									}
								}
							}
						}
						if(ob.updates !== undefined){ 
							for(var i=0;i<ob.updates[0];i++){
								if(ob.updates[i+1].message !== undefined){
									tg_out.innerHTML += ((ob.updates[i+1].message.from_id !== undefined)?" from "+ob.updates[i+1].message.from_id+ " " : "") + "> " + ob.updates[i+1].message.to_id.user_id + " : " + utf8Decode(ob.updates[i+1].message.message) +" "+ob.updates[i+1].message.id +"<br>"
								}
							}
						}
						break
					}
				}
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
				arr = arr.slice(lengthString(arr))
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