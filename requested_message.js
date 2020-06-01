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
		for(var i=1;i<ob.users[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob.users[i],stringifyReplacer)) + "<br>"
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
