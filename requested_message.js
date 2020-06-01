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
	var request_name = "get_User_Photos"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x91cd32a8}},//photos.getUserPhotos#91cd32a8 user_id:InputUser offset:int max_id:long limit:int = photos.Photos;
							[i++]:{inputUser:{uint4:0xd8292816}},//inputUser#d8292816 user_id:int access_hash:long = InputUser;
							[i++]:{user_id:{uint4:request._id}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
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

function send_sticker_to_User(request, callback){
	var request_name = "send_sticker_to_User"
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

function send_sticker_to_Channel(request, callback){
	var request_name = "send_sticker_to_Channel"
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

function getFile(request, callback){
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
							[i++]:{inputPhotoFileLocation:{uint4:0x40181ffe}},//inputPhotoFileLocation#40181ffe id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
							[i++]:{id:{long:request._id.toString()}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
							[i++]:{file_reference:{bytes:request._file_reference}},
							[i++]:{thumb_size:{string:request._thumb_size}},
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

function getFileDC(request, callback){
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
							[i++]:{inputPhotoFileLocation:{uint4:0x40181ffe}},//inputPhotoFileLocation#40181ffe id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
							[i++]:{id:{long:request._id.toString()}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
							[i++]:{file_reference:{bytes:request._file_reference}},
							[i++]:{thumb_size:{string:request._thumb_size}},
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
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
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
		console.log(utf8Decode(JSON.stringify(ob,stringifyReplacer)))
	}
	
	requested_msg[request_name]=is_callback ? arguments[1] : _internal
}

function send_external_GIF_to_User(request, callback){
	var request_name = "send_external_GIF_to_User"
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

function send_external_GIF_to_Channel(request, callback){
	var request_name = "send_external_GIF_to_Channel"
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

function send_textmessage_to_User(request, callback){
	var request_name = "send_textmessage_to_User"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x520c3870}},//messages.sendMessage#520c3870 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
							[i++]:{flags:{uint4:0x0}},
							[i++]:{inputPeer:{uint4:0x7b8e7de6}},//inputPeerUser#7b8e7de6 user_id:int access_hash:long = InputPeer;											
							[i++]:{user_id:{uint4:request._id}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
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

function send_textmessage_to_Channel(request, callback){
	var request_name = "send_textmessage_to_Channel"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0x520c3870}},//messages.sendMessage#520c3870 flags:# no_webpage:flags.1?true silent:flags.5?true background:flags.6?true clear_draft:flags.7?true peer:InputPeer reply_to_msg_id:flags.0?int message:string random_id:long reply_markup:flags.2?ReplyMarkup entities:flags.3?Vector<MessageEntity> schedule_date:flags.10?int = Updates;
							[i++]:{flags:{uint4:0x0}},
							[i++]:{inputPeer:{uint4:0x20adaef8}},//inputPeerUser#7b8e7de6 user_id:int access_hash:long = InputPeer;											
							[i++]:{user_id:{uint4:request._id}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
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

function get_history_from_User(request, callback){
	var request_name = "get_history_from_User"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xdcbb8260}},//messages.getHistory#dcbb8260 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:int = messages.Messages;
							[i++]:{inputPeer:{uint4:0x7b8e7de6}},//inputPeerUser#7b8e7de6 user_id:int access_hash:long = InputPeer;											
							[i++]:{user_id:{uint4:request._id}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
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

function get_history_from_Channel(request, callback){
	var request_name = "get_history_from_Channel"
	var is_callback = false;
	if (arguments.length > 1 && arguments[1] !== undefined){
		is_callback = true
		request_name = callback.name
	}
	var i = 0
	tl_request ={id:request_name,
					body:{[i++]:{tl_constructor:{uint4:0xdcbb8260}},//messages.getHistory#dcbb8260 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:int = messages.Messages;
							[i++]:{inputPeer:{uint4:0x20adaef8}},//inputPeerUser#7b8e7de6 user_id:int access_hash:long = InputPeer;											
							[i++]:{user_id:{uint4:request._id}},
							[i++]:{access_hash:{long:request._access_hash.toString()}},
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

//		for(var i=1;i<ob.chats[0];i++){
//		}
		for(var i=1;i<ob.dialogs[0];i++){
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
		}
//		for(var i=1;i<ob.messages[0];i++){
//		}
//		for(var i=1;i<ob.users[0];i++){
//		}
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
