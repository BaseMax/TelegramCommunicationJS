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
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_history(request, callback){
	var request_name = "send_history"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xd9fee60e}},//messages.forwardMessages#d9fee60e from_peer:InputPeer id:Vector<int> random_id:Vector<long> to_peer:InputPeer schedule_date:flags.10?int = Updates;			
							[i++]:{flags:{uint4:request._flags}},
							[i++]:{from_peer:{uint4:request._from_peer}},
								[i++]:{from_user_id:(request._id_frompeer != undefined)?{uint4:request._id_frompeer}:{skip:0}},
								[i++]:{from_access_hash:(request._access_hash_frompeer != undefined)?{long:request._access_hash_frompeer.toString()}:{skip:0}},
							[i++]:{vector_id:{uint4:0x1cb5c415}},
								[i++]:{vector_id_len:{uint4:0x1}},
								[i++]:{_id:{uint4:request._msg_id}},
							[i++]:{vector_rnd_id:{uint4:0x1cb5c415}},
								[i++]:{vector_rnd_id_len:{uint4:0x1}},
								[i++]:{_rnd_id:{long:request._random_id.toString()}},
							[i++]:{to_peer:{uint4:request._peer}},
							[i++]:{to_user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
							[i++]:{to_access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
					}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
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

function getUserPhotos(request, callback){
	var request_name = "get_Photo"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x91cd32a8}},//photos.getUserPhotos#91cd32a8 user_id:InputUser offset:int max_id:long limit:int = photos.Photos;
							[i++]:{inputUser:{uint4:request._peer}},
							[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
							[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
							[i++]:{offset:{uint4:request._offset}},
							[i++]:{max_id:{long:request._max_id.toString()}},
							[i++]:{limit:{uint4:request._limit}},
						 }}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function getThumbs(request, callback){
	var request_name = "get_Thunbs"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xb15a9afc}},//upload.getFile#b15a9afc flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:int limit:int = upload.File;
							[i++]:{flags:{uint4:request._flags}},
								[i++]:{inputPhotoFileLocation:{uint4:0xdbaeae9}},//inputStickerSetThumb#dbaeae9 stickerset:InputStickerSet volume_id:long local_id:int = InputFileLocation;
						  			[i++]:{inputStickerSetShortName:{uint4:0x861cc8a0}},//inputStickerSetShortName#861cc8a0 short_name:string = InputStickerSet;
						  			[i++]:{short_name:{string:request._short_name}},
								[i++]:{volume_id:{long:request._volume_id.toString()}},
								[i++]:{local_id:{uint4:request._local_id}},
							[i++]:{offset:{uint4:request._offset}},
							[i++]:{limit:{uint4:request._limit}},
						 }}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_sticker(request, callback){
	var request_name = "send_sticker"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},//messages.sendMedia#3491eba9 flags:# peer:InputPeer media:InputMedia message:string random_id:long 
							[i++]:{flags:{uint4:0x0}},
							[i++]:{inputPeer:{uint4:request._peer}},
							[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
							[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
								[i++]:{inputMediaDocument:{uint4:0x23ab23d2}},//inputMediaDocument#23ab23d2 flags:# id:InputDocument ttl_seconds:flags.0?int = InputMedia;
								[i++]:{flags:{uint4:0x0}},
								[i++]:{inputDocument:{uint4:0x1abfb575}},//inputDocument#1abfb575 id:long access_hash:long file_reference:bytes = InputDocument;
									[i++]:{id:{long:request._id_st.toString()}},
									[i++]:{access_hash_doc:{long:request._access_hash_st.toString()}},
									[i++]:{file_reference:{bytes:request._file_reference}},
							[i++]:{message:{string:""}},
							[i++]:{random_id:{long:request._message_rnd_id.toString()}}
					}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function getFileProfilePhoto(request, callback){
	var request_name = "get_File"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xb15a9afc}},//upload.getFile#b15a9afc flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:int limit:int = upload.File;
							[i++]:{flags:{uint4:request._flags}},
								[i++]:{inputPhotoFileLocation:{uint4:0x27d69997}},//inputPeerPhotoFileLocation#27d69997 flags:# big:flags.0?true peer:InputPeer volume_id:long local_id:int = InputFileLocation;
								[i++]:{flags:{uint4:0}},
								[i++]:{inputPeer:{uint4:request._peer}},
								[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
								[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
								[i++]:{volume_id:{long:request._volume_id.toString()}},
								[i++]:{local_id:{uint4:request._local_id}},
							[i++]:{offset:{uint4:request._offset}},
							[i++]:{limit:{uint4:request._limit}},
						 }}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function getFileProfilePhotoDC(request, callback){
	var request_name = "get_File_DC_"+request._dc_id
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name+"_"+request._dc_id
	}
	var i = 0
	var dc_tl_request={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xb15a9afc}},//upload.getFile#b15a9afc flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:int limit:int = upload.File;
							[i++]:{flags:{uint4:request._flags}},
								[i++]:{inputPhotoFileLocation:{uint4:0x27d69997}},//inputPeerPhotoFileLocation#27d69997 flags:# big:flags.0?true peer:InputPeer volume_id:long local_id:int = InputFileLocation;
								[i++]:{flags:{uint4:0}},
								[i++]:{inputPeer:{uint4:request._peer}},
								[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
								[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
								[i++]:{volume_id:{long:request._volume_id.toString()}},
								[i++]:{local_id:{uint4:request._local_id}},
							[i++]:{offset:{uint4:request._offset}},
							[i++]:{limit:{uint4:request._limit}},
						 }}
	DCproc[request._dc_id].postMessage(['message_to_queue',dc_tl_request,request_name])

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_saved_mediaFile(request, callback){
	var request_name = "send_saved_mediaFile"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},//messages.sendMedia#3491eba9 flags:# peer:InputPeer media:InputMedia message:string random_id:long 
							[i++]:{flags:{uint4:0x0}},
							[i++]:{inputPeer:{uint4:request._peer}},
							[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
							[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
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
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_external_GIF(request, callback){
	var request_name = "send_external_GIF"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
				body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},//messages.sendMedia#3491eba9 flags:# peer:InputPeer media:InputMedia message:string random_id:long 
						[i++]:{flags:{uint4:0x0}},
						[i++]:{inputPeer:{uint4:request._peer}},
						[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
						[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
						   [i++]:{inputMediaGifExternal:{uint4:0x4843b0fd}},//inputMediaGifExternal#4843b0fd url:string q:string = InputMedia;
						   [i++]:{url:{string:request._URL}},
						   [i++]:{q:{string:request._q}},
						[i++]:{message:{string:request._message}},
						[i++]:{random_id:{long:request._message_rnd_id.toString()}}
				}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_textmessage(request, callback){
	var request_name = "send_textmessage"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x520c3870}},//messages.sendMessage#520c3870 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
							[i++]:{flags:{uint4:0x0}},
							[i++]:{inputPeer:{uint4:request._peer}},
							[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
							[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
							[i++]:{message:{string:request._message}},
							[i++]:{random_id:{long:request._message_rnd_id.toString()}}
					}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_privatetextmessage(request, callback){
	var request_name = "send_privatetextmessage"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
		tl_request ={id:request_name,
						body:{[i++]:{tl_constructor:{uint4:0x520c3870}},//messages.sendMessage#520c3870 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
								[i++]:{flags:{uint4:0x0}},
								[i++]:{inputPeer:{uint4:0x7da07ec9}},
								[i++]:{message:{string:request._message}},
								[i++]:{random_id:{long:request._message_rnd_id.toString()}}
						}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function get_history(request, callback){
	var request_name = "get_history"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xdcbb8260}},//messages.getHistory#dcbb8260 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:int = messages.Messages;
							[i++]:{inputPeer:{uint4:request._peer}},
							[i++]:{user_id:(request._id != undefined)?{uint4:request._id}:{skip:0}},
							[i++]:{access_hash:(request._access_hash != undefined)?{long:request._access_hash.toString()}:{skip:0}},
							[i++]:{offset_id:{uint4:request._offset_id}},
							[i++]:{offset_date:{uint4:request._offset_date}},
							[i++]:{add_offset:{uint4:request._add_offset}},
							[i++]:{limit:{uint4:request._count}},
							[i++]:{max_id:{uint4:request._max_id}},
							[i++]:{min_id:{uint4:request._min_id}},
							[i++]:{hash:{uint4:request._hash}}
					}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function exportAutorization(DC_ID, callback){
	var request_name = "export_Autorization"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xe5bfffcd}},
							[i++]:{dc_id:{uint4:DC_ID}}
					}}
	mode = 8

	const _internal = function(ob){
		console.log(request_name)
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

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
		document.getElementById('tgresult').appendChild(renderjson(arguments[0],"get Dialog result"));

//for test only clear dialog list==============================================================================
	var  len = userlist.options.length;
    for (var j=len; j; j--) {
        userlist.removeChild(userlist.options[j-1]);
    }
//end test code	=============================================================================================
		for(var j=1;j<=ob.users[0];j++){
			if(ob.users[j].self != undefined) {
				var opt = document.createElement('option');
				opt.appendChild( document.createTextNode(utf8Decode(ob.users[j].first_name)+" (it's me)"));
				opt.value = JSON.stringify({"type":"self",
											"id":ob.users[j].id,
											"access_hash":ob.users[j].access_hash,
											"photo":(ob.users[j].photo != undefined)? ob.users[j].photo:{},
											"data":ob.users[j]},stringifyReplacer)
				userlist.appendChild(opt); 
				break
			}
		}
		//list separator
		
		var opt = document.createElement('option');
		opt.style="font-size: 1pt;"
		opt.disabled =true
		opt.appendChild( document.createTextNode(""));
		userlist.appendChild(opt); 

		var opt = document.createElement('option');
		opt.style="font-size: 1pt;"
		opt.disabled =true
		opt.appendChild( document.createTextNode(""));
		userlist.appendChild(opt); 
		
		
		for(var i=1;i<=ob.dialogs[0];i++){
			if(ob.dialogs[i].peer.channel_id != undefined){
				for(var j=1;j<=ob.chats[0];j++){
					if(ob.dialogs[i].peer.channel_id == ob.chats[j].id) {
						var opt = document.createElement('option');
						if(ob.chats[j].broadcast == undefined){
							opt.appendChild( document.createTextNode(utf8Decode(ob.chats[j].title)+" (cnl)"));
							opt.value = JSON.stringify({"type":"channel",
														"id":ob.chats[j].id,
														"access_hash":ob.chats[j].access_hash,
														"photo":(ob.chats[j].photo != undefined)? ob.chats[j].photo:{},
														"data":ob.chats[j]},stringifyReplacer)
						}else{
							opt.appendChild( document.createTextNode(utf8Decode(ob.chats[j].title)+" (br)"));
							opt.value = JSON.stringify({"type":"broadcast",
														"id":ob.chats[j].id,
														"access_hash":ob.chats[j].access_hash,
														"photo":(ob.chats[j].photo != undefined)? ob.chats[j].photo:{},
														"data":ob.chats[j]},stringifyReplacer)
						}
						if(ob.dialogs[i].folder_id == undefined){
							userlist.insertBefore(opt,userlist.childNodes[3])
						} else {
							userlist.appendChild(opt); 
						}
						continue
					}
				}
				continue
			}
			if(ob.dialogs[i].peer.chat_id != undefined){
				for(var j=1;j<=ob.chats[0];j++){
					if(ob.dialogs[i].peer.chat_id == ob.chats[j].id) {
						var opt = document.createElement('option');
						opt.appendChild( document.createTextNode(utf8Decode(ob.chats[j].title)+" (ch)"));
						opt.value = JSON.stringify({"type":"chat",
													"id":ob.chats[j].id,
													"photo":(ob.chats[j].photo != undefined)? ob.chats[j].photo:{},
													"data":ob.chats[j]},stringifyReplacer)
						if(ob.dialogs[i].folder_id == undefined){
							userlist.insertBefore(opt,userlist.childNodes[3])
						} else {
							userlist.appendChild(opt); 
						}
						continue
					}
				}
				continue
			}
			if(ob.dialogs[i].peer.user_id != undefined){
				for(var j=1;j<=ob.users[0];j++){
					if(ob.dialogs[i].peer.user_id == ob.users[j].id) {
						var opt = document.createElement('option');
						if(ob.users[j].bot == undefined){
							opt.appendChild( document.createTextNode(utf8Decode(ob.users[j].first_name)+" (usr)"));
							opt.value = JSON.stringify({"type":"user",
														"id":ob.users[j].id,
														"access_hash":ob.users[j].access_hash,
														"photo":(ob.users[j].photo != undefined)? ob.users[j].photo:{},
														"data":ob.users[j]},stringifyReplacer)
						} else {
							opt.appendChild( document.createTextNode(utf8Decode(ob.users[j].first_name)+" (bot)"));
							opt.value = JSON.stringify({"type":"bot",
														"id":ob.users[j].id,
														"access_hash":ob.users[j].access_hash,
														"photo":(ob.users[j].photo != undefined)? ob.users[j].photo:{},
														"data":ob.users[j]},stringifyReplacer)
						}
						if(ob.dialogs[i].folder_id == undefined){
							userlist.insertBefore(opt,userlist.childNodes[3])
						} else {
							userlist.appendChild(opt); 
						}
						continue
					}
				}
				continue
			}
		}
	}
}
requested_msg["getDialogs"]=_getDialogs

////help.getConfig#c4f9186b
function getConfig(){//help.getConfig#c4f9186b = Config;
	var i = 0
    tl_request={id:"getConfig",body:{[i++]:{tl_constructor:{uint4:0xc4f9186b}}}}
	mode = 8
}
const _getConfig = function(ob){
	document.getElementById('tgresult').appendChild(renderjson(arguments[0],"get Config result"));
	for(var i=1;i<ob.dc_options[0];i++){
		if(ob.dc_options[i].static)	DCaddr4[ob.dc_options[i].id] = "ws://"+ob.dc_options[i].ip_address + "/apiws"
	}
}
requested_msg["getConfig"]=_getConfig
