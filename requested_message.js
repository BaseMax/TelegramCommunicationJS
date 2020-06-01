function call_tl_func(request, callback){
	var request_name = "default_request"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	tl_request ={id:request_name,body:request}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console_log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function saveFile(request, callback){
	const block_size = 1024
	var file_length = request._file_data_array.length
	var blocks = file_length / block_size
		blocks = blocks - (blocks%1)
	var last_block = file_length % block_size
		blocks += (last_block > 0)? 1 : 0
	var blockprocessed = 0

	const _saveOneBlock = function(){
		var i = 0
		var buffer = request._file_data_array.slice(blockprocessed*block_size,(blockprocessed+1)*block_size)
		//upload.saveFilePart#b304a621 file_id:long file_part:int bytes:bytes = Bool;		
		tl_request={id:"saveOneBlock",body:{[i++]:{tl_constructor:{uint4:0xb304a621}},
										   [i++]:{file_id:{long:request._file_random_id.toString()}},
										   [i++]:{file_part:{uint4:blockprocessed}},
										   [i++]:{data:{bytes:buffer}}
										}}
		mode = 8
		blockprocessed++
	}
	
	const _internal = function(ob){
		if(ob.tl_constructor == 0x997275b5 ) {
			if(blockprocessed < blocks){
				_saveOneBlock()
			} else {
				callback(calcMD5(request._file_data_array), blocks, request._file_name, request._file_data_type, file_length, request._file_random_id)
			}
		}
	}

	requested_msg["saveOneBlock"]= _internal
	_saveOneBlock()
}

function send_saved_mediaFile_to_User(request, callback){
	var request_name = "send_saved_mediaFile_to_User"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},//messages.sendMedia#3491eba9 flags:# peer:InputPeer media:InputMedia message:string random_id:long 
							[i++]:{flags:{uint4:0x0}},
							[i++]:{inputPeer:{uint4:0x7b8e7de6}},//inputPeerUser#7b8e7de6 user_id:int access_hash:long = InputPeer;											
							[i++]:{user_id:{uint4:request._id}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
								[i++]:{inputMediaDocument:{uint4:0x5b38c6c1}},//inputMediaUploadedDocument#5b38c6c1 flags:# nosound_video:flags.3?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int = InputMedia;
								[i++]:{flags:{uint4:0x0}},
								[i++]:{inputFile:{uint4:0xf52ff27f}},//inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;											
									[i++]:{id:{long:request._file_random_id.toString()}},
									[i++]:{parts:{uint4:request._blocks}},
									[i++]:{name:{string:request._filename}},
									[i++]:{md5_checksum:{string:request._MD5}},
								[i++]:{name:{string:request._datatype}},
								[i++]:{attributes:{uint4:0x1cb5c415}},
									[i++]:{count:{uint4:0x1}},
									[i++]:{documentAttributeFilename:{uint4:0x15590068}},
									[i++]:{name:{string:request._filename}},
								[i++]:{message:{string:request._message}},
								[i++]:{random_id:{long:request._message_rnd_id.toString()}}
					}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console_log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_saved_mediaFile_to_Channel(request, callback){
	var request_name = "send_saved_mediaFile_to_Channel"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},//messages.sendMedia#3491eba9 flags:# peer:InputPeer media:InputMedia message:string random_id:long 
							[i++]:{flags:{uint4:0x0}},
							[i++]:{inputPeer:{uint4:0x20adaef8}},//inputPeerUser#7b8e7de6 user_id:int access_hash:long = InputPeer;											
							[i++]:{user_id:{uint4:request._id}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
								[i++]:{inputMediaDocument:{uint4:0x5b38c6c1}},//inputMediaUploadedDocument#5b38c6c1 flags:# nosound_video:flags.3?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int = InputMedia;
								[i++]:{flags:{uint4:0x0}},
								[i++]:{inputFile:{uint4:0xf52ff27f}},//inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;											
									[i++]:{id:{long:request._file_random_id.toString()}},
									[i++]:{parts:{uint4:request._blocks}},
									[i++]:{name:{string:request._filename}},
									[i++]:{md5_checksum:{string:request._MD5}},
								[i++]:{name:{string:request._datatype}},
								[i++]:{attributes:{uint4:0x1cb5c415}},
									[i++]:{count:{uint4:0x1}},
									[i++]:{documentAttributeFilename:{uint4:0x15590068}},
									[i++]:{name:{string:request._filename}},
								[i++]:{message:{string:request._message}},
								[i++]:{random_id:{long:request._message_rnd_id.toString()}}
					}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console_log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}


//test function send ext media
function sendMedia(){
var data_to_send = "i.gifer.com/6D.gif"
var _access_hash=BigInt(JSON.parse(userlist.options[userlist.selectedIndex].value).access_hash.replace("n",""))
var _id=parseInt(JSON.parse(userlist.options[userlist.selectedIndex].value).id,10)
var peer=0x7b8e7de6
if(JSON.parse(userlist.options[userlist.selectedIndex].value).megagroup != undefined){
	peer=0x20adaef8
}
var _rndid=122
//messages.sendMedia#3491eba9 flags:# silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int media:InputMedia message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
	var i = 0
    tl_request={id:"sendMedia",body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},
									   [i++]:{flags:{uint4:0x0}},
									   [i++]:{inputPeer:{uint4:peer}},
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
var _access_hash=BigInt(JSON.parse(userlist.options[userlist.selectedIndex].value).access_hash.replace("n",""))
var _id=parseInt(JSON.parse(userlist.options[userlist.selectedIndex].value).id,10)
var peer=0x7b8e7de6
if(JSON.parse(userlist.options[userlist.selectedIndex].value).megagroup != undefined){
	peer=0x20adaef8
}
var _random_id= 150//need long random value
//messages.sendMessage#520c3870 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
	var i = 0
    tl_request={id:"sendMessage",body:{[i++]:{tl_constructor:{uint4:0x520c3870}},
									   [i++]:{flags:{uint4:0x0}},
									   [i++]:{inputPeer:{uint4:peer}},
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
									   [i++]:{offset_peer:{uint4:0x7f3b18ea/*7da07ec9*/}},
									   [i++]:{limit:{uint4:200}},
									   [i++]:{hash:{uint4:0}}}} 
	mode = 8
}
const _getDialogs = function(ob){
	if(ob.tl_constructor == 0x15ba6c40){//messages.dialogs#15ba6c40 dialogs:Vector<Dialog> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.Dialogs;)

//for test only clear dialog list==============================================================================
var  len = userlist.options.length;
    for (var j=len; j; j--) {
        userlist.removeChild(userlist.options[j-1]);
    }
//end test code	=============================================================================================

		tg_out.innerHTML += "<br><br> == Chats =="
		for(var i=1;i<ob.chats[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob.chats[i],stringifyReplacer)) + "<br>"
		}
		tg_out.innerHTML += "<br><br> == Dialogs =="
		for(var i=1;i<ob.dialogs[0];i++){
			tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob.dialogs[i],stringifyReplacer)) + "<br>"
//for test only add dialog to list=============================================================================
if(ob.dialogs[i].flags & 0x1){
	for(var j=1;j<ob.chats[0];j++){
		if(ob.dialogs[i].peer.channel_id == ob.chats[j].id) {
var opt = document.createElement('option');
opt.appendChild( document.createTextNode(utf8Decode(ob.chats[j].title)));
opt.value = JSON.stringify(ob.chats[j],stringifyReplacer)
userlist.appendChild(opt); 
		}
	}
}else{
	for(var j=1;j<ob.users[0];j++){
		if(ob.dialogs[i].peer.user_id == ob.users[j].id) {
var opt = document.createElement('option');
opt.appendChild( document.createTextNode(utf8Decode(ob.users[j].first_name)));
opt.value = JSON.stringify(ob.users[j],stringifyReplacer)
userlist.appendChild(opt); 
		}
	}
}
//end test code	=============================================================================================
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

/*
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
*/

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

//test function get history 
function getHistory(count, callback){
var _access_hash=BigInt(JSON.parse(userlist.options[userlist.selectedIndex].value).access_hash.replace("n",""))
var _id=parseInt(JSON.parse(userlist.options[userlist.selectedIndex].value).id,10)
var peer=0x7b8e7de6
if(JSON.parse(userlist.options[userlist.selectedIndex].value).megagroup != undefined){
	peer=0x20adaef8
}
//messages.getHistory#dcbb8260 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:int = messages.Messages;
	var i = 0
    tl_request={id:"getHistory",body:{[i++]:{tl_constructor:{uint4:0xdcbb8260}},
									   [i++]:{inputPeer:{uint4:peer}},
									   [i++]:{user_id:{uint4:_id}},
									   [i++]:{access_hash:{long:_access_hash.toString()}},
									   [i++]:{offset_id:{uint4: 0}},
									   [i++]:{offset_date:{uint4: 0}},
									   [i++]:{add_offset:{uint4: 0}},
									   [i++]:{limit:{uint4: parseInt(count,10)}},
									   [i++]:{max_id:{uint4: 0}},
									   [i++]:{min_id:{uint4: 0}},
									   [i++]:{hash:{uint4: 0}}
									 }}
	mode = 8
//}
const _internal = function(ob){
	tg_out.innerHTML += "<br><br> == getHistory =="
	tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob,stringifyReplacer)) + "<br>"
	//todo for test remove
	tg_out.scrollTop = tg_out.scrollHeight;
}
 
requested_msg["getHistory"]=arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _internal//_getHistory
}

