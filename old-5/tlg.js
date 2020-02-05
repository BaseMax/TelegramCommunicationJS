include('func.js');
include('settings.js');


const mtproto_state = document.getElementById('mtprotoresult')
const tg_out = document.getElementById('tgresult')
tg_out.innerHTML= "=<br>"
var dataC = localStorage.getItem('dc')
if(dataC == null) dataC = "1"
localStorage.setItem('dc',dataC)

//var dd = pick_out([10,11,12],{counrty:"string",this_dc:"uint4",nearest_dc:"uint4"})

const mainloopdelay = 10
var mainlooptimer = null
var mtprotoproc = null
var mode = 0 //start
var phonenum=null
var _phonenum=null
var _phonehash = null
var code=null
var testcounter0= 0

function restore_input(){
	document.getElementById('phone').disabled=false
	document.getElementById('phoneSend').disabled=false
	document.getElementById('code').disabled=false
	document.getElementById('codeSend').disabled=false
}
function sendphonenum(number){
	//auth.sendCode#a677244f phone_number:string api_id:int api_hash:string settings:CodeSettings = auth.SentCode;
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
	code={id:"PhoneCode",body:{tl_constructor:{uint4:0xbcd51581},
							  phone_number:{string:_phonenum},
							  phone_code_hash:{string:_phonehash},
							  phone_code:{string:phonecode}}}
	document.getElementById('code').disabled=true
	document.getElementById('codeSend').disabled=true
	mode = 6
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
			    mtprotoproc.postMessage(['message_to_queue',phonenum,'some params if need..'])
			    break
		}
		case 6:{
			    mode = 7 //wait phone code
			    mtprotoproc.postMessage(['message_to_queue',code,'some params if need..'])
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
		case 2:{//message from mtproto
				mtproto_state.innerHTML = e.data[1]
//				console.hex(e.data[1].message_answer)
				var ob = parse_answer(e.data[1].message_answer)
				if(e.data[1].id == "PhoneNumber"){
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
				}else{
					if(e.data[1].id == "PhoneCode"){
						tg_out.innerHTML += "name: "+ob.first_name+"<br>"
						tg_out.innerHTML += "last name: "+ob.last_name+"<br>"
						tg_out.innerHTML += "user name: "+ob.username+"<br>"
						tg_out.innerHTML += "phone: "+ob.phone+"<br>"
						//tg_out.innerHTML += "photo id: "+ob.photo+"<br>"
						tg_out.innerHTML += "status: "+ob.status+"<br>"

					}					
				}
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
	var ret = null
	var tl_constructor = readUInt32LE(body,0)
	body = body.slice(4) //remove tl_constructor
	switch (tl_constructor){
		case 0x8e1a1775:{ //nearestDc#8e1a1775 country:string this_dc:int nearest_dc:int = NearestDc;
			ret = pick_out(body,{counrty:"string",this_dc:"uint4",nearest_dc:"uint4"})
			break
		}
		case 0x2215bcbd:{//auth.sentCode#2215bcbd phone_registered:Bool phone_code_hash:string = auth.SentCode;
			ret = pick_out(body,{phone_registered:"bool",phone_code_hash:"string"})
			break
		}
		case 0x5e002502:{// flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
			var _flags = readUInt32LE(body, 0)
			var request={}
			if(readUInt32LE(body, 4) == 0xab03c6d9 ){
				request = {flags:"uint4",type:"uint4",pattern:"string",phone_code_hash:"string"}
			}else{
				request = {flags:"uint4",type:"uint4",length:"uint4",phone_code_hash:"string"}
			}
			if(_flags & 0x2) request.next_type="uint4"
			if(_flags & 0x4) request.timeout="uint4"
			ret = pick_out(body,request)
			break
		}
		case 0xcd050916:{// flags:# tmp_sessions:flags.0?int user:User
			var _flags = readUInt32LE(body, 0)
			var request={}
			if(_flags & 0x1){
				request.tmp_sessions="uint4"
			}else {
				if(readUInt32LE(body, 4) == 0x938458c1 ){// flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true id:int access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string = User;
					body = body.slice(8) //remove _flags and tl_constructor
					var flags = readUInt32LE(body, 0)
					request.flags="uint4"
					if(flags & 0x400) request.self="true"
					if(flags & 0x800) request.contact="true"
					if(flags & 0x1000) request.mutual_contact="true"
					if(flags & 0x2000) request.deleted="true"
					if(flags & 0x4000) request.bot="true"
					if(flags & 0x8000) request.bot_chat_history="true"
					if(flags & 0x10000) request.bot_nochats="true"
					if(flags & 0x20000) request.verified="true"
					if(flags & 0x40000) request.restricted="true"
					if(flags & 0x80000) request.min="true"
					if(flags & 0x100000) request.bot_inline_geo="true"
					if(flags & 0x200000) request.support="true"
					if(flags & 0x400000) request.scam="true"
					request.id="uint4"
					if(flags & 0x1) request.access_hash="long"
					if(flags & 0x2) request.first_name="string"
					if(flags & 0x4) request.last_name="string"
					if(flags & 0x8) request.username="string"
					if(flags & 0x10) request.phone="string"
					if(flags & 0x20) request.photo="userprofilephoto"
					if(flags & 0x40) request.status="uint4"
					if(flags & 0x4000) request.bot_info_version="uint4"
					if(flags & 0x40000) request.restriction_reason="vector" //todo
					if(flags & 0x80000) request.bot_inline_placeholder="string"
					if(flags & 0x400000) request.lang_code="string"
				}
			}
			ret = pick_out(body,request)
			break
		}
		case 0x2144ca19:{//RPCerror error:int message:string
			ret = pick_out(body,{error:"uint4",error_text:"string"})
			break
		}
		default:{
			console.log('Unknown tl_constructor 0x'+tl_constructor.toString(16)+' add it at tlg.js line  ~155')
			console.hex(body)
			break
		}
	}
	return ret
}

function pick_out(arr,tl_info){
	var out = {}
	var properties = Object.getOwnPropertyNames(tl_info)
	for(var j = 0; j < properties.length; j++){
		switch (tl_info[properties[j]]){
			case "uint4":{
				out[properties[j]] = readUInt32LE(arr, 0)
				arr = arr.slice(4)
				break
			}
			case "long":{
				out[properties[j]] = readBigIntFromBuffer(arr.slice(0,8), true, true)
				arr = arr.slice(8)
				break
			}
			case "bool":{
				out[properties[j]] = (readUInt32LE(arr, 0)==0x997275b5) ? true : false
				arr = arr.slice(4)
				break
			}
			case "string":{
				out[properties[j]] = readString(arr)
				arr = arr.slice(lengthString(arr))
				break
			}
			case "true":{
				out[properties[j]] = true
				break
			}
			case "userprofilephoto":{
				if(readUInt32LE(arr, 0) == 0xecd75d8c ){
					out[properties[j]] = readBigIntFromBuffer(arr.slice(0,8), true, true)
					//skip filelocation
					arr = arr.slice(48)
				}else{
					arr = arr.slice(4)
				}
				break
			}
			default:{
				console.log('Unknown type add it at tlg.js line  ~234')
			}
		}
	}	
	return out
}
function include(url) {
  var s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.async = false; 
  s.setAttribute("src", url);
  document.body.appendChild(s);
}