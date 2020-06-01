//test function send ext media
function sendMedia(){
var data_to_send = "i.gifer.com/6D.gif"
//var	_MD5 = BigInt("0x"+calcMD5(data_to_send))
var _access_hash=BigInt(userlist.options[userlist.selectedIndex].value)
var _id=parseInt(userlist.options[userlist.selectedIndex].text,10)
var _rndid=122
//messages.sendMedia#3491eba9 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
	var i = 0
    tl_request={id:"sendMedia",body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},
									   [i++]:{flags:{uint4:0x0}},

									   [i++]:{inputPeer:{uint4:0x7b8e7de6}},
									   [i++]:{user_id:{uint4:_id}},
									   [i++]:{access_hash:{long:_access_hash.toString()}},

									 	//inputMediaGifExternal#4843b0fd url:string q:string = InputMedia;
									   [i++]:{inputMediaGifExternal:{uint4:0x4843b0fd}},
									   [i++]:{url:{string:data_to_send}},
									   [i++]:{q:{string:""}},

									   [i++]:{message:{string:"test external media message, tlg prototype"}},
									   [i++]:{random_id:{long:_rndid.toString()}}
									}}
	mode = 8
}
const _sendMedia = function(ob){
	tg_out.innerHTML += "<br><br> == sendMedia =="
	tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob,stringifyReplacer)) + "<br>"
	//if(ob.tl_constructor == 0x997275b5 ) sendMMesage()
	//todo for test remove
	tg_out.scrollTop = tg_out.scrollHeight;
}
requested_msg["sendMedia"]=_sendMedia

//test function send only predefined text
function sendMessage(){
var text_to_send = "test from tlg prototype"
var _access_hash=BigInt(userlist.options[userlist.selectedIndex].value)
var _id=parseInt(userlist.options[userlist.selectedIndex].text,10)
var _random_id= 150//need long random value
//messages.sendMessage#520c3870 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
	var i = 0
    tl_request={id:"sendMessage",body:{[i++]:{tl_constructor:{uint4:0x520c3870}},
									   [i++]:{flags:{uint4:0x0}},
									   [i++]:{inputPeer:{uint4:0x7b8e7de6}},
									   [i++]:{user_id:{uint4:_id}},
									   [i++]:{access_hash:{long:_access_hash.toString()}},
									   [i++]:{message:{string:text_to_send}},
									   [i++]:{random_id:{long:_random_id.toString()}}}}
	mode = 8
}
const _sendMessage = function(ob){
	tg_out.innerHTML += "<br><br> == sendMessage =="
	tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob,stringifyReplacer)) + "<br>"
	//todo for test remove
	tg_out.scrollTop = tg_out.scrollHeight;
}
requested_msg["sendMessage"]=_sendMessage


//messages.getDialogs#a0ee3b73
function getDialogs(){//messages.getDialogs#a0ee3b73 flags:# exclude_pinned:flags.0?true folder_id:flags.1?int offset_date:int offset_id:int offset_peer:InputPeer limit:int hash:int = messages.Dialogs;
	var i = 0
    tl_request={id:"getDialogs",body:{[i++]:{tl_constructor:{uint4:0xa0ee3b73}},
									   [i++]:{flags:{uint4:0}},
									   [i++]:{offset_date:{uint4:0}},
									   [i++]:{offset_id:{uint4:0}},
									   [i++]:{offset_peer:{uint4:0x7da07ec9}},
									   [i++]:{limit:{uint4:80}},
									   [i++]:{hash:{uint4:0}}}} 
	mode = 8
}
const _getDialogs = function(ob){
	if(ob.tl_constructor == 0x15ba6c40){//messages.dialogs#15ba6c40 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;)
		tg_out.innerHTML += "<br><br> == Chats =="
		for(var i=1;i<ob.chats[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob.chats[i],stringifyReplacer)) + "<br>"
		}
		tg_out.innerHTML += "<br><br> == Dialogs =="
		for(var i=1;i<ob.dialogs[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob.dialogs[i],stringifyReplacer)) + "<br>"
		}
		tg_out.innerHTML += "<br><br> == Messages =="
		for(var i=1;i<ob.messages[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob.messages[i],stringifyReplacer)) + "<br>"
		}
		tg_out.innerHTML += "<br><br> == Users =="
		
//for test only clear user list==============================================================================
var  len = userlist.options.length;
    for (var j=len; j; j--) {
        userlist.removeChild(userlist.options[j-1]);
    }
//end test code	=============================================================================================
		
		for(var i=1;i<ob.users[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob.users[i],stringifyReplacer)) + "<br>"
			
//for test only add user to list=============================================================================
var opt = document.createElement('option');
opt.appendChild( document.createTextNode(ob.users[i].id));
opt.value = ob.users[i].access_hash
userlist.appendChild(opt); 
//end test code	=============================================================================================

		}
	}
	//todo for test remove
	tg_out.scrollTop = tg_out.scrollHeight;
}
requested_msg["getDialogs"]=_getDialogs

//contacts.getStatuses#c4a353ee
function getContacts(){//contacts.getStatuses#c4a353ee = Vector<ContactStatus>;
	var i = 0
    tl_request={id:"getContacts",body:{[i++]:{tl_constructor:{uint4:0xc4a353ee}}}}
	mode = 8
}
const _getContacts = function(ob){
	tg_out.innerHTML += "<br><br> == GetContacts =="
	for(var i=1;i<ob[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob[i],stringifyReplacer)) + "<br>"
	}
	//todo for test remove
	tg_out.scrollTop = tg_out.scrollHeight;
}
requested_msg["getContacts"]=_getContacts

//=== auth.logOut#5717da40 
function logOut(){ //auth.logOut#5717da40 = Bool;
	var i = 0
    tl_request={id:"logOut",body:{[i++]:{tl_constructor:{uint4:0x5717da40}}}} 
	mode = 8
}
const _logOut = function(ob){
	mtproto_state.innerHTML = "logOut Ok"
}
requested_msg["logOut"]=_logOut

////help.getConfig#c4f9186b
function getConfig(){//help.getConfig#c4f9186b = Config;
	var i = 0
    tl_request={id:"getConfig",body:{[i++]:{tl_constructor:{uint4:0xc4f9186b}}}}
	mode = 8
}
const _getConfig = function(ob){
	tg_out.innerHTML += "<br><br> == GetConfig =="
	tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob,stringifyReplacer)) + "<br>"
	//todo for test remove
	tg_out.scrollTop = tg_out.scrollHeight;
}
requested_msg["getConfig"]=_getConfig
