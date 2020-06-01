include('func.js');
include('settings.js');


const mtproto_state = document.getElementById('mtprotoresult')

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
			    mtprotoproc.postMessage(['connect','start connection to server, possibly server address, etc.'])
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
	if(mode == 1) mtproto_state.innerHTML = 'Connecting to server...... '+testcounter0
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
				mtproto_state.innerHTML = JSON.stringify(ob)
				if(e.data[1].id == "PhoneNumber"){
				//	if(ob.phone_registered == true){
				  		mode = 5 //wait sms code
						_phonehash = ob.phone_code_hash
						document.getElementById('codelabel').hidden=false
						document.getElementById('code').hidden=false
						document.getElementById('codeSend').hidden=false
				//	}
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
		default:{
			console.log('Unknown tl_constructor 0x'+tl_constructor.toString(16)+' add it at tlg.js line  ~128')
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
			default:{
				console.log('Unknown type add it at tlg.js line  ~145')
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