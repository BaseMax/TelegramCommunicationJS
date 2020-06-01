function getrequest(tl_constructor,_flags,vector_type){
	var request = null
	var i = 0
	switch (tl_constructor){
	case 0xbc799737: {// boolFalse
		request = {}
		break
	}
	case 0x997275b5: {// boolTrue
		request = {}
		break
	}
	case 0x3fedd339: {// true
		request = {}
		break
	}
	case 0x1cb5c415: { //vector
		request = {[i++]:{"0":"uint4"}}
		for( i; i<=_flags; i++){
			request[i] = Object.fromEntries([[i,vector_type]])
		}
		break
	}
	case 0xc4b9f9bb: {// error
		request = {[i++]:{code:"int"},[i++]:{text:"string"}}
		break
	}
	case 0x56730bcc: {// null
		request = {}
		break
	}
	case 0x7f3b18ea: {// inputPeerEmpty
		request = {}
		break
	}
	case 0x7da07ec9: {// inputPeerSelf
		request = {}
		break
	}
	case 0x179be863: {// inputPeerChat
		request = {[i++]:{chat_id:"int"}}
		break
	}
	case 0xb98886cf: {// inputUserEmpty
		request = {}
		break
	}
	case 0xf7c1b13f: {// inputUserSelf
		request = {}
		break
	}
	case 0xf392b7f4: {// inputPhoneContact
		request = {[i++]:{client_id:"long"},[i++]:{phone:"string"},[i++]:{first_name:"string"},[i++]:{last_name:"string"}}
		break
	}
	case 0xf52ff27f: {// inputFile
		request = {[i++]:{id:"long"},[i++]:{parts:"int"},[i++]:{name:"string"},[i++]:{md5_checksum:"string"}}
		break
	}
	case 0x9664f57f: {// inputMediaEmpty
		request = {}
		break
	}
	case 0x1e287d04: {// inputMediaUploadedPhoto
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["file","InputFile"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["stickers","Vector<InputDocument>"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0xb3ba0635: {// inputMediaPhoto
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","InputPhoto"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0xf9c44144: {// inputMediaGeoPoint
		request = {[i++]:{geo_point:"InputGeoPoint"}}
		break
	}
	case 0xf8ab7dfb: {// inputMediaContact
		request = {[i++]:{phone_number:"string"},[i++]:{first_name:"string"},[i++]:{last_name:"string"},[i++]:{vcard:"string"}}
		break
	}
	case 0x1ca48f57: {// inputChatPhotoEmpty
		request = {}
		break
	}
	case 0x927c55b4: {// inputChatUploadedPhoto
		request = {[i++]:{file:"InputFile"}}
		break
	}
	case 0x8953ad37: {// inputChatPhoto
		request = {[i++]:{id:"InputPhoto"}}
		break
	}
	case 0xe4c123d6: {// inputGeoPointEmpty
		request = {}
		break
	}
	case 0xf3b7acc9: {// inputGeoPoint
		request = {[i++]:{lat:"double"},[i++]:{long:"double"}}
		break
	}
	case 0x1cd7bf0d: {// inputPhotoEmpty
		request = {}
		break
	}
	case 0x3bb3b94a: {// inputPhoto
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"},[i++]:{file_reference:"bytes"}}
		break
	}
	case 0xdfdaabe1: {// inputFileLocation
		request = {[i++]:{volume_id:"long"},[i++]:{local_id:"int"},[i++]:{secret:"long"},[i++]:{file_reference:"bytes"}}
		break
	}
	case 0x9db1bc6d: {// peerUser
		request = {[i++]:{user_id:"int"}}
		break
	}
	case 0xbad0e5bb: {// peerChat
		request = {[i++]:{chat_id:"int"}}
		break
	}
	case 0xaa963b05: {// storage.fileUnknown
		request = {}
		break
	}
	case 0x40bc6f52: {// storage.filePartial
		request = {}
		break
	}
	case 0x7efe0e: {// storage.fileJpeg
		request = {}
		break
	}
	case 0xcae1aadf: {// storage.fileGif
		request = {}
		break
	}
	case 0xa4f63c0: {// storage.filePng
		request = {}
		break
	}
	case 0xae1e508d: {// storage.filePdf
		request = {}
		break
	}
	case 0x528a0677: {// storage.fileMp3
		request = {}
		break
	}
	case 0x4b09ebbc: {// storage.fileMov
		request = {}
		break
	}
	case 0xb3cea0e4: {// storage.fileMp4
		request = {}
		break
	}
	case 0x1081464c: {// storage.fileWebp
		request = {}
		break
	}
	case 0x200250ba: {// userEmpty
		request = {[i++]:{id:"int"}}
		break
	}
	case 0x4f11bae1: {// userProfilePhotoEmpty
		request = {}
		break
	}
	case 0xecd75d8c: {// userProfilePhoto
		request = {[i++]:{photo_id:"long"},[i++]:{photo_small:"FileLocation"},[i++]:{photo_big:"FileLocation"},[i++]:{dc_id:"int"}}
		break
	}
	case 0x9d05049: {// userStatusEmpty
		request = {}
		break
	}
	case 0xedb93949: {// userStatusOnline
		request = {[i++]:{expires:"int"}}
		break
	}
	case 0x8c703f: {// userStatusOffline
		request = {[i++]:{was_online:"int"}}
		break
	}
	case 0x9ba2d800: {// chatEmpty
		request = {[i++]:{id:"int"}}
		break
	}
	case 0x3bda1bde: {// chat
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["creator","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["kicked","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["left","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["deactivated","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["photo","ChatPhoto"]])
		request[i++]=Object.fromEntries([["participants_count","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["version","int"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["migrated_to","InputChannel"]])
		if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["admin_rights","ChatAdminRights"]])
		if(_flags & (1 << 18)) request[i++]=Object.fromEntries([["default_banned_rights","ChatBannedRights"]])
		break
	}
	case 0x7328bdb: {// chatForbidden
		request = {[i++]:{id:"int"},[i++]:{title:"string"}}
		break
	}
	case 0x1b7c9db3: {// chatFull
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["can_set_username","true"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["has_scheduled","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["about","string"]])
		request[i++]=Object.fromEntries([["participants","ChatParticipants"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["chat_photo","Photo"]])
		request[i++]=Object.fromEntries([["notify_settings","PeerNotifySettings"]])
		request[i++]=Object.fromEntries([["exported_invite","ExportedChatInvite"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["bot_info","Vector<BotInfo>"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["pinned_msg_id","int"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["folder_id","int"]])
		break
	}
	case 0xc8d7493e: {// chatParticipant
		request = {[i++]:{user_id:"int"},[i++]:{inviter_id:"int"},[i++]:{date:"int"}}
		break
	}
	case 0xfc900c2b: {// chatParticipantsForbidden
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["chat_id","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["self_participant","ChatParticipant"]])
		break
	}
	case 0x3f460fed: {// chatParticipants
		request = {[i++]:{chat_id:"int"},[i++]:{participants:"Vector<ChatParticipant>"},[i++]:{version:"int"}}
		break
	}
	case 0x37c1011c: {// chatPhotoEmpty
		request = {}
		break
	}
	case 0x475cdbd5: {// chatPhoto
		request = {[i++]:{photo_small:"FileLocation"},[i++]:{photo_big:"FileLocation"},[i++]:{dc_id:"int"}}
		break
	}
	case 0x83e5de54: {// messageEmpty
		request = {[i++]:{id:"int"}}
		break
	}
	case 0x452c0e65: {// message
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["out","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["mentioned","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["media_unread","true"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["silent","true"]])
		if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["post","true"]])
		if(_flags & (1 << 18)) request[i++]=Object.fromEntries([["from_scheduled","true"]])
		if(_flags & (1 << 19)) request[i++]=Object.fromEntries([["legacy","true"]])
		if(_flags & (1 << 21)) request[i++]=Object.fromEntries([["edit_hide","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["from_id","int"]])
		request[i++]=Object.fromEntries([["to_id","Peer"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["fwd_from","MessageFwdHeader"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["via_bot_id","int"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["reply_to_msg_id","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["media","MessageMedia"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["views","int"]])
		if(_flags & (1 << 15)) request[i++]=Object.fromEntries([["edit_date","int"]])
		if(_flags & (1 << 16)) request[i++]=Object.fromEntries([["post_author","string"]])
		if(_flags & (1 << 17)) request[i++]=Object.fromEntries([["grouped_id","long"]])
		if(_flags & (1 << 22)) request[i++]=Object.fromEntries([["restriction_reason","Vector<RestrictionReason>"]])
		break
	}
	case 0x9e19a1f6: {// messageService
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["out","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["mentioned","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["media_unread","true"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["silent","true"]])
		if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["post","true"]])
		if(_flags & (1 << 19)) request[i++]=Object.fromEntries([["legacy","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["from_id","int"]])
		request[i++]=Object.fromEntries([["to_id","Peer"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["reply_to_msg_id","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["action","MessageAction"]])
		break
	}
	case 0x3ded6320: {// messageMediaEmpty
		request = {}
		break
	}
	case 0x695150d7: {// messageMediaPhoto
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["photo","Photo"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0x56e0d474: {// messageMediaGeo
		request = {[i++]:{geo:"GeoPoint"}}
		break
	}
	case 0xcbf24940: {// messageMediaContact
		request = {[i++]:{phone_number:"string"},[i++]:{first_name:"string"},[i++]:{last_name:"string"},[i++]:{vcard:"string"},[i++]:{user_id:"int"}}
		break
	}
	case 0x9f84f49e: {// messageMediaUnsupported
		request = {}
		break
	}
	case 0xb6aef7b0: {// messageActionEmpty
		request = {}
		break
	}
	case 0xa6638b9a: {// messageActionChatCreate
		request = {[i++]:{title:"string"},[i++]:{users:"Vector<int>"}}
		break
	}
	case 0xb5a1ce5a: {// messageActionChatEditTitle
		request = {[i++]:{title:"string"}}
		break
	}
	case 0x7fcb13a8: {// messageActionChatEditPhoto
		request = {[i++]:{photo:"Photo"}}
		break
	}
	case 0x95e3fbef: {// messageActionChatDeletePhoto
		request = {}
		break
	}
	case 0x488a7337: {// messageActionChatAddUser
		request = {[i++]:{users:"Vector<int>"}}
		break
	}
	case 0xb2ae9b0c: {// messageActionChatDeleteUser
		request = {[i++]:{user_id:"int"}}
		break
	}
	case 0x2c171f72: {// dialog
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["pinned","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["unread_mark","true"]])
		request[i++]=Object.fromEntries([["peer","Peer"]])
		request[i++]=Object.fromEntries([["top_message","int"]])
		request[i++]=Object.fromEntries([["read_inbox_max_id","int"]])
		request[i++]=Object.fromEntries([["read_outbox_max_id","int"]])
		request[i++]=Object.fromEntries([["unread_count","int"]])
		request[i++]=Object.fromEntries([["unread_mentions_count","int"]])
		request[i++]=Object.fromEntries([["notify_settings","PeerNotifySettings"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["pts","int"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["draft","DraftMessage"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["folder_id","int"]])
		break
	}
	case 0x2331b22d: {// photoEmpty
		request = {[i++]:{id:"long"}}
		break
	}
	case 0xd07504a5: {// photo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["has_stickers","true"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["file_reference","bytes"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["sizes","Vector<PhotoSize>"]])
		request[i++]=Object.fromEntries([["dc_id","int"]])
		break
	}
	case 0xe17e23c: {// photoSizeEmpty
		request = {[i++]:{type:"string"}}
		break
	}
	case 0x77bfb61b: {// photoSize
		request = {[i++]:{type:"string"},[i++]:{location:"FileLocation"},[i++]:{w:"int"},[i++]:{h:"int"},[i++]:{size:"int"}}
		break
	}
	case 0xe9a734fa: {// photoCachedSize
		request = {[i++]:{type:"string"},[i++]:{location:"FileLocation"},[i++]:{w:"int"},[i++]:{h:"int"},[i++]:{bytes:"bytes"}}
		break
	}
	case 0x1117dd5f: {// geoPointEmpty
		request = {}
		break
	}
	case 0x296f104: {// geoPoint
		request = {[i++]:{long:"double"},[i++]:{lat:"double"},[i++]:{access_hash:"long"}}
		break
	}
	case 0x5e002502: {// auth.sentCode
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["type","auth.SentCodeType"]])
		request[i++]=Object.fromEntries([["phone_code_hash","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["next_type","auth.CodeType"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["timeout","int"]])
		break
	}
	case 0xcd050916: {// auth.authorization
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["tmp_sessions","int"]])
		request[i++]=Object.fromEntries([["user","User"]])
		break
	}
	case 0xdf969c2d: {// auth.exportedAuthorization
		request = {[i++]:{id:"int"},[i++]:{bytes:"bytes"}}
		break
	}
	case 0xb8bc5b0c: {// inputNotifyPeer
		request = {[i++]:{peer:"InputPeer"}}
		break
	}
	case 0x193b4417: {// inputNotifyUsers
		request = {}
		break
	}
	case 0x4a95e84e: {// inputNotifyChats
		request = {}
		break
	}
	case 0x9c3d198e: {// inputPeerNotifySettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["show_previews","Bool"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["silent","Bool"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["mute_until","int"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["sound","string"]])
		break
	}
	case 0xaf509d20: {// peerNotifySettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["show_previews","Bool"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["silent","Bool"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["mute_until","int"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["sound","string"]])
		break
	}
	case 0x818426cd: {// peerSettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["report_spam","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["add_contact","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["block_contact","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["share_contact","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["need_contacts_exception","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["report_geo","true"]])
		break
	}
	case 0xa437c3ed: {// wallPaper
		request = {[i++]:{id:"long"},[i++]:{flags:"#"},[i++]:{creator:"flags.0?true"},[i++]:{default:"flags.1?true"},[i++]:{pattern:"flags.3?true"},[i++]:{dark:"flags.4?true"},[i++]:{access_hash:"long"},[i++]:{slug:"string"},[i++]:{document:"Document"},[i++]:{settings:"flags.2?WallPaperSettings"}}
		break
	}
	case 0x58dbcab8: {// inputReportReasonSpam
		request = {}
		break
	}
	case 0x1e22c78d: {// inputReportReasonViolence
		request = {}
		break
	}
	case 0x2e59d922: {// inputReportReasonPornography
		request = {}
		break
	}
	case 0xadf44ee3: {// inputReportReasonChildAbuse
		request = {}
		break
	}
	case 0xe1746d0a: {// inputReportReasonOther
		request = {[i++]:{text:"string"}}
		break
	}
	case 0xedf17c12: {// userFull
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["blocked","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["phone_calls_available","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["phone_calls_private","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["can_pin_message","true"]])
		if(_flags & (1 << 12)) request[i++]=Object.fromEntries([["has_scheduled","true"]])
		request[i++]=Object.fromEntries([["user","User"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["about","string"]])
		request[i++]=Object.fromEntries([["settings","PeerSettings"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["profile_photo","Photo"]])
		request[i++]=Object.fromEntries([["notify_settings","PeerNotifySettings"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["bot_info","BotInfo"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["pinned_msg_id","int"]])
		request[i++]=Object.fromEntries([["common_chats_count","int"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["folder_id","int"]])
		break
	}
	case 0xf911c994: {// contact
		request = {[i++]:{user_id:"int"},[i++]:{mutual:"Bool"}}
		break
	}
	case 0xd0028438: {// importedContact
		request = {[i++]:{user_id:"int"},[i++]:{client_id:"long"}}
		break
	}
	case 0x561bc879: {// contactBlocked
		request = {[i++]:{user_id:"int"},[i++]:{date:"int"}}
		break
	}
	case 0xd3680c61: {// contactStatus
		request = {[i++]:{user_id:"int"},[i++]:{status:"UserStatus"}}
		break
	}
	case 0xb74ba9d2: {// contacts.contactsNotModified
		request = {}
		break
	}
	case 0xeae87e42: {// contacts.contacts
		request = {[i++]:{contacts:"Vector<Contact>"},[i++]:{saved_count:"int"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x77d01c3b: {// contacts.importedContacts
		request = {[i++]:{imported:"Vector<ImportedContact>"},[i++]:{popular_invites:"Vector<PopularContact>"},[i++]:{retry_contacts:"Vector<long>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x1c138d15: {// contacts.blocked
		request = {[i++]:{blocked:"Vector<ContactBlocked>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x900802a1: {// contacts.blockedSlice
		request = {[i++]:{count:"int"},[i++]:{blocked:"Vector<ContactBlocked>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x15ba6c40: {// messages.dialogs
		request = {[i++]:{dialogs:"Vector<Dialog>"},[i++]:{messages:"Vector<Message>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x71e094f3: {// messages.dialogsSlice
		request = {[i++]:{count:"int"},[i++]:{dialogs:"Vector<Dialog>"},[i++]:{messages:"Vector<Message>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x8c718e87: {// messages.messages
		request = {[i++]:{messages:"Vector<Message>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xc8edce1e: {// messages.messagesSlice
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["inexact","true"]])
		request[i++]=Object.fromEntries([["count","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["next_rate","int"]])
		request[i++]=Object.fromEntries([["messages","Vector<Message>"]])
		request[i++]=Object.fromEntries([["chats","Vector<Chat>"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		break
	}
	case 0x64ff9fd5: {// messages.chats
		request = {[i++]:{chats:"Vector<Chat>"}}
		break
	}
	case 0xe5d7d19c: {// messages.chatFull
		request = {[i++]:{full_chat:"ChatFull"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xb45c69d1: {// messages.affectedHistory
		request = {[i++]:{pts:"int"},[i++]:{pts_count:"int"},[i++]:{offset:"int"}}
		break
	}
	case 0x57e2f66c: {// inputMessagesFilterEmpty
		request = {}
		break
	}
	case 0x9609a51c: {// inputMessagesFilterPhotos
		request = {}
		break
	}
	case 0x9fc00e65: {// inputMessagesFilterVideo
		request = {}
		break
	}
	case 0x56e9f0e4: {// inputMessagesFilterPhotoVideo
		request = {}
		break
	}
	case 0x9eddf188: {// inputMessagesFilterDocument
		request = {}
		break
	}
	case 0x7ef0dd87: {// inputMessagesFilterUrl
		request = {}
		break
	}
	case 0xffc86587: {// inputMessagesFilterGif
		request = {}
		break
	}
	case 0x1f2b0afd: {// updateNewMessage
		request = {[i++]:{message:"Message"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x4e90bfd6: {// updateMessageID
		request = {[i++]:{id:"int"},[i++]:{random_id:"long"}}
		break
	}
	case 0xa20db0e5: {// updateDeleteMessages
		request = {[i++]:{messages:"Vector<int>"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x5c486927: {// updateUserTyping
		request = {[i++]:{user_id:"int"},[i++]:{action:"SendMessageAction"}}
		break
	}
	case 0x9a65ea1f: {// updateChatUserTyping
		request = {[i++]:{chat_id:"int"},[i++]:{user_id:"int"},[i++]:{action:"SendMessageAction"}}
		break
	}
	case 0x7761198: {// updateChatParticipants
		request = {[i++]:{participants:"ChatParticipants"}}
		break
	}
	case 0x1bfbd823: {// updateUserStatus
		request = {[i++]:{user_id:"int"},[i++]:{status:"UserStatus"}}
		break
	}
	case 0xa7332b73: {// updateUserName
		request = {[i++]:{user_id:"int"},[i++]:{first_name:"string"},[i++]:{last_name:"string"},[i++]:{username:"string"}}
		break
	}
	case 0x95313b0c: {// updateUserPhoto
		request = {[i++]:{user_id:"int"},[i++]:{date:"int"},[i++]:{photo:"UserProfilePhoto"},[i++]:{previous:"Bool"}}
		break
	}
	case 0xa56c2a3e: {// updates.state
		request = {[i++]:{pts:"int"},[i++]:{qts:"int"},[i++]:{date:"int"},[i++]:{seq:"int"},[i++]:{unread_count:"int"}}
		break
	}
	case 0x5d75a138: {// updates.differenceEmpty
		request = {[i++]:{date:"int"},[i++]:{seq:"int"}}
		break
	}
	case 0xf49ca0: {// updates.difference
		request = {[i++]:{new_messages:"Vector<Message>"},[i++]:{new_encrypted_messages:"Vector<EncryptedMessage>"},[i++]:{other_updates:"Vector<Update>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"},[i++]:{state:"updates.State"}}
		break
	}
	case 0xa8fb1981: {// updates.differenceSlice
		request = {[i++]:{new_messages:"Vector<Message>"},[i++]:{new_encrypted_messages:"Vector<EncryptedMessage>"},[i++]:{other_updates:"Vector<Update>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"},[i++]:{intermediate_state:"updates.State"}}
		break
	}
	case 0xe317af7e: {// updatesTooLong
		request = {}
		break
	}
	case 0x914fbf11: {// updateShortMessage
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["out","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["mentioned","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["media_unread","true"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["silent","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		request[i++]=Object.fromEntries([["message","string"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		request[i++]=Object.fromEntries([["pts_count","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["fwd_from","MessageFwdHeader"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["via_bot_id","int"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["reply_to_msg_id","int"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		break
	}
	case 0x16812688: {// updateShortChatMessage
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["out","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["mentioned","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["media_unread","true"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["silent","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["from_id","int"]])
		request[i++]=Object.fromEntries([["chat_id","int"]])
		request[i++]=Object.fromEntries([["message","string"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		request[i++]=Object.fromEntries([["pts_count","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["fwd_from","MessageFwdHeader"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["via_bot_id","int"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["reply_to_msg_id","int"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		break
	}
	case 0x78d4dec1: {// updateShort
		request = {[i++]:{update:"Update"},[i++]:{date:"int"}}
		break
	}
	case 0x725b04c3: {// updatesCombined
		request = {[i++]:{updates:"Vector<Update>"},[i++]:{users:"Vector<User>"},[i++]:{chats:"Vector<Chat>"},[i++]:{date:"int"},[i++]:{seq_start:"int"},[i++]:{seq:"int"}}
		break
	}
	case 0x74ae4240: {// updates
		request = {[i++]:{updates:"Vector<Update>"},[i++]:{users:"Vector<User>"},[i++]:{chats:"Vector<Chat>"},[i++]:{date:"int"},[i++]:{seq:"int"}}
		break
	}
	case 0x8dca6aa5: {// photos.photos
		request = {[i++]:{photos:"Vector<Photo>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x15051f54: {// photos.photosSlice
		request = {[i++]:{count:"int"},[i++]:{photos:"Vector<Photo>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x20212ca8: {// photos.photo
		request = {[i++]:{photo:"Photo"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x96a18d5: {// upload.file
		request = {[i++]:{type:"storage.FileType"},[i++]:{mtime:"int"},[i++]:{bytes:"bytes"}}
		break
	}
	case 0x18b7a10d: {// dcOption
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["ipv6","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["media_only","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["tcpo_only","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["cdn","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["static","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["ip_address","string"]])
		request[i++]=Object.fromEntries([["port","int"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["secret","bytes"]])
		break
	}
	case 0x330b4067: {// config
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["phonecalls_enabled","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["default_p2p_contacts","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["preload_featured_stickers","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["ignore_phone_entities","true"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["revoke_pm_inbox","true"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["blocked_mode","true"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["pfs_enabled","true"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["expires","int"]])
		request[i++]=Object.fromEntries([["test_mode","Bool"]])
		request[i++]=Object.fromEntries([["this_dc","int"]])
		request[i++]=Object.fromEntries([["dc_options","Vector<DcOption>"]])
		request[i++]=Object.fromEntries([["dc_txt_domain_name","string"]])
		request[i++]=Object.fromEntries([["chat_size_max","int"]])
		request[i++]=Object.fromEntries([["megagroup_size_max","int"]])
		request[i++]=Object.fromEntries([["forwarded_count_max","int"]])
		request[i++]=Object.fromEntries([["online_update_period_ms","int"]])
		request[i++]=Object.fromEntries([["offline_blur_timeout_ms","int"]])
		request[i++]=Object.fromEntries([["offline_idle_timeout_ms","int"]])
		request[i++]=Object.fromEntries([["online_cloud_timeout_ms","int"]])
		request[i++]=Object.fromEntries([["notify_cloud_delay_ms","int"]])
		request[i++]=Object.fromEntries([["notify_default_delay_ms","int"]])
		request[i++]=Object.fromEntries([["push_chat_period_ms","int"]])
		request[i++]=Object.fromEntries([["push_chat_limit","int"]])
		request[i++]=Object.fromEntries([["saved_gifs_limit","int"]])
		request[i++]=Object.fromEntries([["edit_time_limit","int"]])
		request[i++]=Object.fromEntries([["revoke_time_limit","int"]])
		request[i++]=Object.fromEntries([["revoke_pm_time_limit","int"]])
		request[i++]=Object.fromEntries([["rating_e_decay","int"]])
		request[i++]=Object.fromEntries([["stickers_recent_limit","int"]])
		request[i++]=Object.fromEntries([["stickers_faved_limit","int"]])
		request[i++]=Object.fromEntries([["channels_read_media_period","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["tmp_sessions","int"]])
		request[i++]=Object.fromEntries([["pinned_dialogs_count_max","int"]])
		request[i++]=Object.fromEntries([["pinned_infolder_count_max","int"]])
		request[i++]=Object.fromEntries([["call_receive_timeout_ms","int"]])
		request[i++]=Object.fromEntries([["call_ring_timeout_ms","int"]])
		request[i++]=Object.fromEntries([["call_connect_timeout_ms","int"]])
		request[i++]=Object.fromEntries([["call_packet_timeout_ms","int"]])
		request[i++]=Object.fromEntries([["me_url_prefix","string"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["autoupdate_url_prefix","string"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["gif_search_username","string"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["venue_search_username","string"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["img_search_username","string"]])
		if(_flags & (1 << 12)) request[i++]=Object.fromEntries([["static_maps_provider","string"]])
		request[i++]=Object.fromEntries([["caption_length_max","int"]])
		request[i++]=Object.fromEntries([["message_length_max","int"]])
		request[i++]=Object.fromEntries([["webfile_dc_id","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["suggested_lang_code","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["lang_pack_version","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["base_lang_pack_version","int"]])
		break
	}
	case 0x8e1a1775: {// nearestDc
		request = {[i++]:{country:"string"},[i++]:{this_dc:"int"},[i++]:{nearest_dc:"int"}}
		break
	}
	case 0x1da7158f: {// help.appUpdate
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["can_not_skip","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["version","string"]])
		request[i++]=Object.fromEntries([["text","string"]])
		request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["document","Document"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["url","string"]])
		break
	}
	case 0xc45a6536: {// help.noAppUpdate
		request = {}
		break
	}
	case 0x18cb9f78: {// help.inviteText
		request = {[i++]:{message:"string"}}
		break
	}
	case 0x12bcbd9a: {// updateNewEncryptedMessage
		request = {[i++]:{message:"EncryptedMessage"},[i++]:{qts:"int"}}
		break
	}
	case 0x1710f156: {// updateEncryptedChatTyping
		request = {[i++]:{chat_id:"int"}}
		break
	}
	case 0xb4a2e88d: {// updateEncryption
		request = {[i++]:{chat:"EncryptedChat"},[i++]:{date:"int"}}
		break
	}
	case 0x38fe25b7: {// updateEncryptedMessagesRead
		request = {[i++]:{chat_id:"int"},[i++]:{max_date:"int"},[i++]:{date:"int"}}
		break
	}
	case 0xab7ec0a0: {// encryptedChatEmpty
		request = {[i++]:{id:"int"}}
		break
	}
	case 0x3bf703dc: {// encryptedChatWaiting
		request = {[i++]:{id:"int"},[i++]:{access_hash:"long"},[i++]:{date:"int"},[i++]:{admin_id:"int"},[i++]:{participant_id:"int"}}
		break
	}
	case 0xc878527e: {// encryptedChatRequested
		request = {[i++]:{id:"int"},[i++]:{access_hash:"long"},[i++]:{date:"int"},[i++]:{admin_id:"int"},[i++]:{participant_id:"int"},[i++]:{g_a:"bytes"}}
		break
	}
	case 0xfa56ce36: {// encryptedChat
		request = {[i++]:{id:"int"},[i++]:{access_hash:"long"},[i++]:{date:"int"},[i++]:{admin_id:"int"},[i++]:{participant_id:"int"},[i++]:{g_a_or_b:"bytes"},[i++]:{key_fingerprint:"long"}}
		break
	}
	case 0x13d6dd27: {// encryptedChatDiscarded
		request = {[i++]:{id:"int"}}
		break
	}
	case 0xf141b5e1: {// inputEncryptedChat
		request = {[i++]:{chat_id:"int"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xc21f497e: {// encryptedFileEmpty
		request = {}
		break
	}
	case 0x4a70994c: {// encryptedFile
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"},[i++]:{size:"int"},[i++]:{dc_id:"int"},[i++]:{key_fingerprint:"int"}}
		break
	}
	case 0x1837c364: {// inputEncryptedFileEmpty
		request = {}
		break
	}
	case 0x64bd0306: {// inputEncryptedFileUploaded
		request = {[i++]:{id:"long"},[i++]:{parts:"int"},[i++]:{md5_checksum:"string"},[i++]:{key_fingerprint:"int"}}
		break
	}
	case 0x5a17b5e5: {// inputEncryptedFile
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xf5235d55: {// inputEncryptedFileLocation
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xed18c118: {// encryptedMessage
		request = {[i++]:{random_id:"long"},[i++]:{chat_id:"int"},[i++]:{date:"int"},[i++]:{bytes:"bytes"},[i++]:{file:"EncryptedFile"}}
		break
	}
	case 0x23734b06: {// encryptedMessageService
		request = {[i++]:{random_id:"long"},[i++]:{chat_id:"int"},[i++]:{date:"int"},[i++]:{bytes:"bytes"}}
		break
	}
	case 0xc0e24635: {// messages.dhConfigNotModified
		request = {[i++]:{random:"bytes"}}
		break
	}
	case 0x2c221edd: {// messages.dhConfig
		request = {[i++]:{g:"int"},[i++]:{p:"bytes"},[i++]:{version:"int"},[i++]:{random:"bytes"}}
		break
	}
	case 0x560f8935: {// messages.sentEncryptedMessage
		request = {[i++]:{date:"int"}}
		break
	}
	case 0x9493ff32: {// messages.sentEncryptedFile
		request = {[i++]:{date:"int"},[i++]:{file:"EncryptedFile"}}
		break
	}
	case 0xfa4f0bb5: {// inputFileBig
		request = {[i++]:{id:"long"},[i++]:{parts:"int"},[i++]:{name:"string"}}
		break
	}
	case 0x2dc173c8: {// inputEncryptedFileBigUploaded
		request = {[i++]:{id:"long"},[i++]:{parts:"int"},[i++]:{key_fingerprint:"int"}}
		break
	}
	case 0xea4b0e5c: {// updateChatParticipantAdd
		request = {[i++]:{chat_id:"int"},[i++]:{user_id:"int"},[i++]:{inviter_id:"int"},[i++]:{date:"int"},[i++]:{version:"int"}}
		break
	}
	case 0x6e5f8c22: {// updateChatParticipantDelete
		request = {[i++]:{chat_id:"int"},[i++]:{user_id:"int"},[i++]:{version:"int"}}
		break
	}
	case 0x8e5e9873: {// updateDcOptions
		request = {[i++]:{dc_options:"Vector<DcOption>"}}
		break
	}
	case 0x5b38c6c1: {// inputMediaUploadedDocument
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["nosound_video","true"]])
		request[i++]=Object.fromEntries([["file","InputFile"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["thumb","InputFile"]])
		request[i++]=Object.fromEntries([["mime_type","string"]])
		request[i++]=Object.fromEntries([["attributes","Vector<DocumentAttribute>"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["stickers","Vector<InputDocument>"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0x23ab23d2: {// inputMediaDocument
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","InputDocument"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0x9cb070d7: {// messageMediaDocument
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["document","Document"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0x72f0eaae: {// inputDocumentEmpty
		request = {}
		break
	}
	case 0x1abfb575: {// inputDocument
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"},[i++]:{file_reference:"bytes"}}
		break
	}
	case 0xbad07584: {// inputDocumentFileLocation
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"},[i++]:{file_reference:"bytes"},[i++]:{thumb_size:"string"}}
		break
	}
	case 0x36f8c871: {// documentEmpty
		request = {[i++]:{id:"long"}}
		break
	}
	case 0x9ba29cc1: {// document
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["file_reference","bytes"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["mime_type","string"]])
		request[i++]=Object.fromEntries([["size","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["thumbs","Vector<PhotoSize>"]])
		request[i++]=Object.fromEntries([["dc_id","int"]])
		request[i++]=Object.fromEntries([["attributes","Vector<DocumentAttribute>"]])
		break
	}
	case 0x17c6b5f6: {// help.support
		request = {[i++]:{phone_number:"string"},[i++]:{user:"User"}}
		break
	}
	case 0x9fd40bd8: {// notifyPeer
		request = {[i++]:{peer:"Peer"}}
		break
	}
	case 0xb4c83b4c: {// notifyUsers
		request = {}
		break
	}
	case 0xc007cec3: {// notifyChats
		request = {}
		break
	}
	case 0x80ece81a: {// updateUserBlocked
		request = {[i++]:{user_id:"int"},[i++]:{blocked:"Bool"}}
		break
	}
	case 0xbec268ef: {// updateNotifySettings
		request = {[i++]:{peer:"NotifyPeer"},[i++]:{notify_settings:"PeerNotifySettings"}}
		break
	}
	case 0x16bf744e: {// sendMessageTypingAction
		request = {}
		break
	}
	case 0xfd5ec8f5: {// sendMessageCancelAction
		request = {}
		break
	}
	case 0xa187d66f: {// sendMessageRecordVideoAction
		request = {}
		break
	}
	case 0xe9763aec: {// sendMessageUploadVideoAction
		request = {[i++]:{progress:"int"}}
		break
	}
	case 0xd52f73f7: {// sendMessageRecordAudioAction
		request = {}
		break
	}
	case 0xf351d7ab: {// sendMessageUploadAudioAction
		request = {[i++]:{progress:"int"}}
		break
	}
	case 0xd1d34a26: {// sendMessageUploadPhotoAction
		request = {[i++]:{progress:"int"}}
		break
	}
	case 0xaa0cd9e4: {// sendMessageUploadDocumentAction
		request = {[i++]:{progress:"int"}}
		break
	}
	case 0x176f8ba1: {// sendMessageGeoLocationAction
		request = {}
		break
	}
	case 0x628cbc6f: {// sendMessageChooseContactAction
		request = {}
		break
	}
	case 0xb3134d9d: {// contacts.found
		request = {[i++]:{my_results:"Vector<Peer>"},[i++]:{results:"Vector<Peer>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xebe46819: {// updateServiceNotification
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["popup","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["inbox_date","int"]])
		request[i++]=Object.fromEntries([["type","string"]])
		request[i++]=Object.fromEntries([["message","string"]])
		request[i++]=Object.fromEntries([["media","MessageMedia"]])
		request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		break
	}
	case 0xe26f42f1: {// userStatusRecently
		request = {}
		break
	}
	case 0x7bf09fc: {// userStatusLastWeek
		request = {}
		break
	}
	case 0x77ebc742: {// userStatusLastMonth
		request = {}
		break
	}
	case 0xee3b272a: {// updatePrivacy
		request = {[i++]:{key:"PrivacyKey"},[i++]:{rules:"Vector<PrivacyRule>"}}
		break
	}
	case 0x4f96cb18: {// inputPrivacyKeyStatusTimestamp
		request = {}
		break
	}
	case 0xbc2eab30: {// privacyKeyStatusTimestamp
		request = {}
		break
	}
	case 0xd09e07b: {// inputPrivacyValueAllowContacts
		request = {}
		break
	}
	case 0x184b35ce: {// inputPrivacyValueAllowAll
		request = {}
		break
	}
	case 0x131cc67f: {// inputPrivacyValueAllowUsers
		request = {[i++]:{users:"Vector<InputUser>"}}
		break
	}
	case 0xba52007: {// inputPrivacyValueDisallowContacts
		request = {}
		break
	}
	case 0xd66b66c9: {// inputPrivacyValueDisallowAll
		request = {}
		break
	}
	case 0x90110467: {// inputPrivacyValueDisallowUsers
		request = {[i++]:{users:"Vector<InputUser>"}}
		break
	}
	case 0xfffe1bac: {// privacyValueAllowContacts
		request = {}
		break
	}
	case 0x65427b82: {// privacyValueAllowAll
		request = {}
		break
	}
	case 0x4d5bbe0c: {// privacyValueAllowUsers
		request = {[i++]:{users:"Vector<int>"}}
		break
	}
	case 0xf888fa1a: {// privacyValueDisallowContacts
		request = {}
		break
	}
	case 0x8b73e763: {// privacyValueDisallowAll
		request = {}
		break
	}
	case 0xc7f49b7: {// privacyValueDisallowUsers
		request = {[i++]:{users:"Vector<int>"}}
		break
	}
	case 0x50a04e45: {// account.privacyRules
		request = {[i++]:{rules:"Vector<PrivacyRule>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xb8d0afdf: {// accountDaysTTL
		request = {[i++]:{days:"int"}}
		break
	}
	case 0x12b9417b: {// updateUserPhone
		request = {[i++]:{user_id:"int"},[i++]:{phone:"string"}}
		break
	}
	case 0x6c37c15c: {// documentAttributeImageSize
		request = {[i++]:{w:"int"},[i++]:{h:"int"}}
		break
	}
	case 0x11b58939: {// documentAttributeAnimated
		request = {}
		break
	}
	case 0x6319d612: {// documentAttributeSticker
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["mask","true"]])
		request[i++]=Object.fromEntries([["alt","string"]])
		request[i++]=Object.fromEntries([["stickerset","InputStickerSet"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["mask_coords","MaskCoords"]])
		break
	}
	case 0xef02ce6: {// documentAttributeVideo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["round_message","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["supports_streaming","true"]])
		request[i++]=Object.fromEntries([["duration","int"]])
		request[i++]=Object.fromEntries([["w","int"]])
		request[i++]=Object.fromEntries([["h","int"]])
		break
	}
	case 0x9852f9c6: {// documentAttributeAudio
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["voice","true"]])
		request[i++]=Object.fromEntries([["duration","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["performer","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["waveform","bytes"]])
		break
	}
	case 0x15590068: {// documentAttributeFilename
		request = {[i++]:{file_name:"string"}}
		break
	}
	case 0xf1749a22: {// messages.stickersNotModified
		request = {}
		break
	}
	case 0xe4599bbd: {// messages.stickers
		request = {[i++]:{hash:"int"},[i++]:{stickers:"Vector<Document>"}}
		break
	}
	case 0x12b299d4: {// stickerPack
		request = {[i++]:{emoticon:"string"},[i++]:{documents:"Vector<long>"}}
		break
	}
	case 0xe86602c3: {// messages.allStickersNotModified
		request = {}
		break
	}
	case 0xedfd405f: {// messages.allStickers
		request = {[i++]:{hash:"int"},[i++]:{sets:"Vector<StickerSet>"}}
		break
	}
	case 0x9c974fdf: {// updateReadHistoryInbox
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["folder_id","int"]])
		request[i++]=Object.fromEntries([["peer","Peer"]])
		request[i++]=Object.fromEntries([["max_id","int"]])
		request[i++]=Object.fromEntries([["still_unread_count","int"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		request[i++]=Object.fromEntries([["pts_count","int"]])
		break
	}
	case 0x2f2f21bf: {// updateReadHistoryOutbox
		request = {[i++]:{peer:"Peer"},[i++]:{max_id:"int"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x84d19185: {// messages.affectedMessages
		request = {[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x7f891213: {// updateWebPage
		request = {[i++]:{webpage:"WebPage"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0xeb1477e8: {// webPageEmpty
		request = {[i++]:{id:"long"}}
		break
	}
	case 0xc586da1c: {// webPagePending
		request = {[i++]:{id:"long"},[i++]:{date:"int"}}
		break
	}
	case 0xfa64e172: {// webPage
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["url","string"]])
		request[i++]=Object.fromEntries([["display_url","string"]])
		request[i++]=Object.fromEntries([["hash","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["type","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["site_name","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["description","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["photo","Photo"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["embed_url","string"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["embed_type","string"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["embed_width","int"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["embed_height","int"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["duration","int"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["author","string"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["document","Document"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["documents","Vector<Document>"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["cached_page","Page"]])
		break
	}
	case 0xa32dd600: {// messageMediaWebPage
		request = {[i++]:{webpage:"WebPage"}}
		break
	}
	case 0xad01d61d: {// authorization
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["current","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["official_app","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["password_pending","true"]])
		request[i++]=Object.fromEntries([["hash","long"]])
		request[i++]=Object.fromEntries([["device_model","string"]])
		request[i++]=Object.fromEntries([["platform","string"]])
		request[i++]=Object.fromEntries([["system_version","string"]])
		request[i++]=Object.fromEntries([["api_id","int"]])
		request[i++]=Object.fromEntries([["app_name","string"]])
		request[i++]=Object.fromEntries([["app_version","string"]])
		request[i++]=Object.fromEntries([["date_created","int"]])
		request[i++]=Object.fromEntries([["date_active","int"]])
		request[i++]=Object.fromEntries([["ip","string"]])
		request[i++]=Object.fromEntries([["country","string"]])
		request[i++]=Object.fromEntries([["region","string"]])
		break
	}
	case 0x1250abde: {// account.authorizations
		request = {[i++]:{authorizations:"Vector<Authorization>"}}
		break
	}
	case 0xad2641f8: {// account.password
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["has_recovery","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["has_secure_values","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["has_password","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["current_algo","PasswordKdfAlgo"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["srp_B","bytes"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["srp_id","long"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["hint","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["email_unconfirmed_pattern","string"]])
		request[i++]=Object.fromEntries([["new_algo","PasswordKdfAlgo"]])
		request[i++]=Object.fromEntries([["new_secure_algo","SecurePasswordKdfAlgo"]])
		request[i++]=Object.fromEntries([["secure_random","bytes"]])
		break
	}
	case 0x9a5c33e5: {// account.passwordSettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["email","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["secure_settings","SecureSecretSettings"]])
		break
	}
	case 0xc23727c9: {// account.passwordInputSettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["new_algo","PasswordKdfAlgo"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["new_password_hash","bytes"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["hint","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["email","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["new_secure_settings","SecureSecretSettings"]])
		break
	}
	case 0x137948a5: {// auth.passwordRecovery
		request = {[i++]:{email_pattern:"string"}}
		break
	}
	case 0xc13d1c11: {// inputMediaVenue
		request = {[i++]:{geo_point:"InputGeoPoint"},[i++]:{title:"string"},[i++]:{address:"string"},[i++]:{provider:"string"},[i++]:{venue_id:"string"},[i++]:{venue_type:"string"}}
		break
	}
	case 0x2ec0533f: {// messageMediaVenue
		request = {[i++]:{geo:"GeoPoint"},[i++]:{title:"string"},[i++]:{address:"string"},[i++]:{provider:"string"},[i++]:{venue_id:"string"},[i++]:{venue_type:"string"}}
		break
	}
	case 0xa384b779: {// receivedNotifyMessage
		request = {[i++]:{id:"int"},[i++]:{flags:"int"}}
		break
	}
	case 0x69df3769: {// chatInviteEmpty
		request = {}
		break
	}
	case 0xfc2e05bc: {// chatInviteExported
		request = {[i++]:{link:"string"}}
		break
	}
	case 0x5a686d7c: {// chatInviteAlready
		request = {[i++]:{chat:"Chat"}}
		break
	}
	case 0xdfc2f58e: {// chatInvite
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["channel","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["broadcast","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["public","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["megagroup","true"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["photo","Photo"]])
		request[i++]=Object.fromEntries([["participants_count","int"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["participants","Vector<User>"]])
		break
	}
	case 0xf89cf5e8: {// messageActionChatJoinedByLink
		request = {[i++]:{inviter_id:"int"}}
		break
	}
	case 0x68c13933: {// updateReadMessagesContents
		request = {[i++]:{messages:"Vector<int>"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0xffb62b95: {// inputStickerSetEmpty
		request = {}
		break
	}
	case 0x9de7a269: {// inputStickerSetID
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0x861cc8a0: {// inputStickerSetShortName
		request = {[i++]:{short_name:"string"}}
		break
	}
	case 0xeeb46f27: {// stickerSet
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["archived","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["official","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["masks","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["animated","true"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["installed_date","int"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["short_name","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["thumb","PhotoSize"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["thumb_dc_id","int"]])
		request[i++]=Object.fromEntries([["count","int"]])
		request[i++]=Object.fromEntries([["hash","int"]])
		break
	}
	case 0xb60a24a6: {// messages.stickerSet
		request = {[i++]:{set:"StickerSet"},[i++]:{packs:"Vector<StickerPack>"},[i++]:{documents:"Vector<Document>"}}
		break
	}
	case 0x938458c1: {// user
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["self","true"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["contact","true"]])
		if(_flags & (1 << 12)) request[i++]=Object.fromEntries([["mutual_contact","true"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["deleted","true"]])
		if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["bot","true"]])
		if(_flags & (1 << 15)) request[i++]=Object.fromEntries([["bot_chat_history","true"]])
		if(_flags & (1 << 16)) request[i++]=Object.fromEntries([["bot_nochats","true"]])
		if(_flags & (1 << 17)) request[i++]=Object.fromEntries([["verified","true"]])
		if(_flags & (1 << 18)) request[i++]=Object.fromEntries([["restricted","true"]])
		if(_flags & (1 << 20)) request[i++]=Object.fromEntries([["min","true"]])
		if(_flags & (1 << 21)) request[i++]=Object.fromEntries([["bot_inline_geo","true"]])
		if(_flags & (1 << 23)) request[i++]=Object.fromEntries([["support","true"]])
		if(_flags & (1 << 24)) request[i++]=Object.fromEntries([["scam","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["access_hash","long"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["first_name","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["last_name","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["username","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["phone","string"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["photo","UserProfilePhoto"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["status","UserStatus"]])
		if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["bot_info_version","int"]])
		if(_flags & (1 << 18)) request[i++]=Object.fromEntries([["restriction_reason","Vector<RestrictionReason>"]])
		if(_flags & (1 << 19)) request[i++]=Object.fromEntries([["bot_inline_placeholder","string"]])
		if(_flags & (1 << 22)) request[i++]=Object.fromEntries([["lang_code","string"]])
		break
	}
	case 0xc27ac8c7: {// botCommand
		request = {[i++]:{command:"string"},[i++]:{description:"string"}}
		break
	}
	case 0x98e81d3a: {// botInfo
		request = {[i++]:{user_id:"int"},[i++]:{description:"string"},[i++]:{commands:"Vector<BotCommand>"}}
		break
	}
	case 0xa2fa4880: {// keyboardButton
		request = {[i++]:{text:"string"}}
		break
	}
	case 0x77608b83: {// keyboardButtonRow
		request = {[i++]:{buttons:"Vector<KeyboardButton>"}}
		break
	}
	case 0xa03e5b85: {// replyKeyboardHide
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["selective","true"]])
		break
	}
	case 0xf4108aa0: {// replyKeyboardForceReply
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["single_use","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["selective","true"]])
		break
	}
	case 0x3502758c: {// replyKeyboardMarkup
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["resize","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["single_use","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["selective","true"]])
		request[i++]=Object.fromEntries([["rows","Vector<KeyboardButtonRow>"]])
		break
	}
	case 0x7b8e7de6: {// inputPeerUser
		request = {[i++]:{user_id:"int"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xd8292816: {// inputUser
		request = {[i++]:{user_id:"int"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xbb92ba95: {// messageEntityUnknown
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0xfa04579d: {// messageEntityMention
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x6f635b0d: {// messageEntityHashtag
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x6cef8ac7: {// messageEntityBotCommand
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x6ed02538: {// messageEntityUrl
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x64e475c2: {// messageEntityEmail
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0xbd610bc9: {// messageEntityBold
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x826f8b60: {// messageEntityItalic
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x28a20571: {// messageEntityCode
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x73924be0: {// messageEntityPre
		request = {[i++]:{offset:"int"},[i++]:{length:"int"},[i++]:{language:"string"}}
		break
	}
	case 0x76a6d327: {// messageEntityTextUrl
		request = {[i++]:{offset:"int"},[i++]:{length:"int"},[i++]:{url:"string"}}
		break
	}
	case 0x11f1331c: {// updateShortSentMessage
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["out","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		request[i++]=Object.fromEntries([["pts_count","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["media","MessageMedia"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		break
	}
	case 0xee8c1e86: {// inputChannelEmpty
		request = {}
		break
	}
	case 0xafeb712e: {// inputChannel
		request = {[i++]:{channel_id:"int"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xbddde532: {// peerChannel
		request = {[i++]:{channel_id:"int"}}
		break
	}
	case 0x20adaef8: {// inputPeerChannel
		request = {[i++]:{channel_id:"int"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xd31a961e: {// channel
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["creator","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["left","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["broadcast","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["verified","true"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["megagroup","true"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["restricted","true"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["signatures","true"]])
		if(_flags & (1 << 12)) request[i++]=Object.fromEntries([["min","true"]])
		if(_flags & (1 << 19)) request[i++]=Object.fromEntries([["scam","true"]])
		if(_flags & (1 << 20)) request[i++]=Object.fromEntries([["has_link","true"]])
		if(_flags & (1 << 21)) request[i++]=Object.fromEntries([["has_geo","true"]])
		if(_flags & (1 << 22)) request[i++]=Object.fromEntries([["slowmode_enabled","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["username","string"]])
		request[i++]=Object.fromEntries([["photo","ChatPhoto"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["version","int"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["restriction_reason","Vector<RestrictionReason>"]])
		if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["admin_rights","ChatAdminRights"]])
		if(_flags & (1 << 15)) request[i++]=Object.fromEntries([["banned_rights","ChatBannedRights"]])
		if(_flags & (1 << 18)) request[i++]=Object.fromEntries([["default_banned_rights","ChatBannedRights"]])
		if(_flags & (1 << 17)) request[i++]=Object.fromEntries([["participants_count","int"]])
		break
	}
	case 0x289da732: {// channelForbidden
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["broadcast","true"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["megagroup","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 16)) request[i++]=Object.fromEntries([["until_date","int"]])
		break
	}
	case 0x7f077ad9: {// contacts.resolvedPeer
		request = {[i++]:{peer:"Peer"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x2d895c74: {// channelFull
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["can_view_participants","true"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["can_set_username","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["can_set_stickers","true"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["hidden_prehistory","true"]])
		if(_flags & (1 << 12)) request[i++]=Object.fromEntries([["can_view_stats","true"]])
		if(_flags & (1 << 16)) request[i++]=Object.fromEntries([["can_set_location","true"]])
		if(_flags & (1 << 19)) request[i++]=Object.fromEntries([["has_scheduled","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["about","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["participants_count","int"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["admins_count","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["kicked_count","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["banned_count","int"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["online_count","int"]])
		request[i++]=Object.fromEntries([["read_inbox_max_id","int"]])
		request[i++]=Object.fromEntries([["read_outbox_max_id","int"]])
		request[i++]=Object.fromEntries([["unread_count","int"]])
		request[i++]=Object.fromEntries([["chat_photo","Photo"]])
		request[i++]=Object.fromEntries([["notify_settings","PeerNotifySettings"]])
		request[i++]=Object.fromEntries([["exported_invite","ExportedChatInvite"]])
		request[i++]=Object.fromEntries([["bot_info","Vector<BotInfo>"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["migrated_from_chat_id","int"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["migrated_from_max_id","int"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["pinned_msg_id","int"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["stickerset","StickerSet"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["available_min_id","int"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["folder_id","int"]])
		if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["linked_chat_id","int"]])
		if(_flags & (1 << 15)) request[i++]=Object.fromEntries([["location","ChannelLocation"]])
		if(_flags & (1 << 17)) request[i++]=Object.fromEntries([["slowmode_seconds","int"]])
		if(_flags & (1 << 18)) request[i++]=Object.fromEntries([["slowmode_next_send_date","int"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		break
	}
	case 0xae30253: {// messageRange
		request = {[i++]:{min_id:"int"},[i++]:{max_id:"int"}}
		break
	}
	case 0x99262e37: {// messages.channelMessages
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["inexact","true"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		request[i++]=Object.fromEntries([["count","int"]])
		request[i++]=Object.fromEntries([["messages","Vector<Message>"]])
		request[i++]=Object.fromEntries([["chats","Vector<Chat>"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		break
	}
	case 0x95d2ac92: {// messageActionChannelCreate
		request = {[i++]:{title:"string"}}
		break
	}
	case 0xeb0467fb: {// updateChannelTooLong
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["channel_id","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["pts","int"]])
		break
	}
	case 0xb6d45656: {// updateChannel
		request = {[i++]:{channel_id:"int"}}
		break
	}
	case 0x62ba04d9: {// updateNewChannelMessage
		request = {[i++]:{message:"Message"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x330b5424: {// updateReadChannelInbox
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["folder_id","int"]])
		request[i++]=Object.fromEntries([["channel_id","int"]])
		request[i++]=Object.fromEntries([["max_id","int"]])
		request[i++]=Object.fromEntries([["still_unread_count","int"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		break
	}
	case 0xc37521c9: {// updateDeleteChannelMessages
		request = {[i++]:{channel_id:"int"},[i++]:{messages:"Vector<int>"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x98a12b4b: {// updateChannelMessageViews
		request = {[i++]:{channel_id:"int"},[i++]:{id:"int"},[i++]:{views:"int"}}
		break
	}
	case 0x3e11affb: {// updates.channelDifferenceEmpty
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["final","true"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["timeout","int"]])
		break
	}
	case 0xa4bcc6fe: {// updates.channelDifferenceTooLong
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["final","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["timeout","int"]])
		request[i++]=Object.fromEntries([["dialog","Dialog"]])
		request[i++]=Object.fromEntries([["messages","Vector<Message>"]])
		request[i++]=Object.fromEntries([["chats","Vector<Chat>"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		break
	}
	case 0x2064674e: {// updates.channelDifference
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["final","true"]])
		request[i++]=Object.fromEntries([["pts","int"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["timeout","int"]])
		request[i++]=Object.fromEntries([["new_messages","Vector<Message>"]])
		request[i++]=Object.fromEntries([["other_updates","Vector<Update>"]])
		request[i++]=Object.fromEntries([["chats","Vector<Chat>"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		break
	}
	case 0x94d42ee7: {// channelMessagesFilterEmpty
		request = {}
		break
	}
	case 0xcd77d957: {// channelMessagesFilter
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["exclude_new_messages","true"]])
		request[i++]=Object.fromEntries([["ranges","Vector<MessageRange>"]])
		break
	}
	case 0x15ebac1d: {// channelParticipant
		request = {[i++]:{user_id:"int"},[i++]:{date:"int"}}
		break
	}
	case 0xa3289a6d: {// channelParticipantSelf
		request = {[i++]:{user_id:"int"},[i++]:{inviter_id:"int"},[i++]:{date:"int"}}
		break
	}
	case 0x808d15a4: {// channelParticipantCreator
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["rank","string"]])
		break
	}
	case 0xde3f3c79: {// channelParticipantsRecent
		request = {}
		break
	}
	case 0xb4608969: {// channelParticipantsAdmins
		request = {}
		break
	}
	case 0xa3b54985: {// channelParticipantsKicked
		request = {[i++]:{q:"string"}}
		break
	}
	case 0xf56ee2a8: {// channels.channelParticipants
		request = {[i++]:{count:"int"},[i++]:{participants:"Vector<ChannelParticipant>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xd0d9b163: {// channels.channelParticipant
		request = {[i++]:{participant:"ChannelParticipant"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xda13538a: {// chatParticipantCreator
		request = {[i++]:{user_id:"int"}}
		break
	}
	case 0xe2d6e436: {// chatParticipantAdmin
		request = {[i++]:{user_id:"int"},[i++]:{inviter_id:"int"},[i++]:{date:"int"}}
		break
	}
	case 0xb6901959: {// updateChatParticipantAdmin
		request = {[i++]:{chat_id:"int"},[i++]:{user_id:"int"},[i++]:{is_admin:"Bool"},[i++]:{version:"int"}}
		break
	}
	case 0x51bdb021: {// messageActionChatMigrateTo
		request = {[i++]:{channel_id:"int"}}
		break
	}
	case 0xb055eaee: {// messageActionChannelMigrateFrom
		request = {[i++]:{title:"string"},[i++]:{chat_id:"int"}}
		break
	}
	case 0xb0d1865b: {// channelParticipantsBots
		request = {}
		break
	}
	case 0x780a0310: {// help.termsOfService
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["popup","true"]])
		request[i++]=Object.fromEntries([["id","DataJSON"]])
		request[i++]=Object.fromEntries([["text","string"]])
		request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["min_age_confirm","int"]])
		break
	}
	case 0x688a30aa: {// updateNewStickerSet
		request = {[i++]:{stickerset:"messages.StickerSet"}}
		break
	}
	case 0xbb2d201: {// updateStickerSetsOrder
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["masks","true"]])
		request[i++]=Object.fromEntries([["order","Vector<long>"]])
		break
	}
	case 0x43ae3dec: {// updateStickerSets
		request = {}
		break
	}
	case 0x162ecc1f: {// foundGif
		request = {[i++]:{url:"string"},[i++]:{thumb_url:"string"},[i++]:{content_url:"string"},[i++]:{content_type:"string"},[i++]:{w:"int"},[i++]:{h:"int"}}
		break
	}
	case 0x9c750409: {// foundGifCached
		request = {[i++]:{url:"string"},[i++]:{photo:"Photo"},[i++]:{document:"Document"}}
		break
	}
	case 0x4843b0fd: {// inputMediaGifExternal
		request = {[i++]:{url:"string"},[i++]:{q:"string"}}
		break
	}
	case 0x450a1c0a: {// messages.foundGifs
		request = {[i++]:{next_offset:"int"},[i++]:{results:"Vector<FoundGif>"}}
		break
	}
	case 0xe8025ca2: {// messages.savedGifsNotModified
		request = {}
		break
	}
	case 0x2e0709a5: {// messages.savedGifs
		request = {[i++]:{hash:"int"},[i++]:{gifs:"Vector<Document>"}}
		break
	}
	case 0x9375341e: {// updateSavedGifs
		request = {}
		break
	}
	case 0x3380c786: {// inputBotInlineMessageMediaAuto
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0x3dcd7a87: {// inputBotInlineMessageText
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["no_webpage","true"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0x88bf9319: {// inputBotInlineResult
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","string"]])
		request[i++]=Object.fromEntries([["type","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["description","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["url","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["thumb","InputWebDocument"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["content","InputWebDocument"]])
		request[i++]=Object.fromEntries([["send_message","InputBotInlineMessage"]])
		break
	}
	case 0x764cf810: {// botInlineMessageMediaAuto
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0x8c7f65e2: {// botInlineMessageText
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["no_webpage","true"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0x11965f3a: {// botInlineResult
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","string"]])
		request[i++]=Object.fromEntries([["type","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["description","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["url","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["thumb","WebDocument"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["content","WebDocument"]])
		request[i++]=Object.fromEntries([["send_message","BotInlineMessage"]])
		break
	}
	case 0x947ca848: {// messages.botResults
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["gallery","true"]])
		request[i++]=Object.fromEntries([["query_id","long"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["next_offset","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["switch_pm","InlineBotSwitchPM"]])
		request[i++]=Object.fromEntries([["results","Vector<BotInlineResult>"]])
		request[i++]=Object.fromEntries([["cache_time","int"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		break
	}
	case 0x54826690: {// updateBotInlineQuery
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["query_id","long"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		request[i++]=Object.fromEntries([["query","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["geo","GeoPoint"]])
		request[i++]=Object.fromEntries([["offset","string"]])
		break
	}
	case 0xe48f964: {// updateBotInlineSend
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		request[i++]=Object.fromEntries([["query","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["geo","GeoPoint"]])
		request[i++]=Object.fromEntries([["id","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["msg_id","InputBotInlineMessageID"]])
		break
	}
	case 0x50f5c392: {// inputMessagesFilterVoice
		request = {}
		break
	}
	case 0x3751b49e: {// inputMessagesFilterMusic
		request = {}
		break
	}
	case 0xbdfb0426: {// inputPrivacyKeyChatInvite
		request = {}
		break
	}
	case 0x500e6dfa: {// privacyKeyChatInvite
		request = {}
		break
	}
	case 0x5dab1af4: {// exportedMessageLink
		request = {[i++]:{link:"string"},[i++]:{html:"string"}}
		break
	}
	case 0xec338270: {// messageFwdHeader
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["from_id","int"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["from_name","string"]])
		request[i++]=Object.fromEntries([["date","int"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["channel_id","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["channel_post","int"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["post_author","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["saved_from_peer","Peer"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["saved_from_msg_id","int"]])
		break
	}
	case 0x1b3f4df7: {// updateEditChannelMessage
		request = {[i++]:{message:"Message"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x98592475: {// updateChannelPinnedMessage
		request = {[i++]:{channel_id:"int"},[i++]:{id:"int"}}
		break
	}
	case 0x94bd38ed: {// messageActionPinMessage
		request = {}
		break
	}
	case 0x72a3158c: {// auth.codeTypeSms
		request = {}
		break
	}
	case 0x741cd3e3: {// auth.codeTypeCall
		request = {}
		break
	}
	case 0x226ccefb: {// auth.codeTypeFlashCall
		request = {}
		break
	}
	case 0x3dbb5986: {// auth.sentCodeTypeApp
		request = {[i++]:{length:"int"}}
		break
	}
	case 0xc000bba2: {// auth.sentCodeTypeSms
		request = {[i++]:{length:"int"}}
		break
	}
	case 0x5353e5a7: {// auth.sentCodeTypeCall
		request = {[i++]:{length:"int"}}
		break
	}
	case 0xab03c6d9: {// auth.sentCodeTypeFlashCall
		request = {[i++]:{pattern:"string"}}
		break
	}
	case 0x258aff05: {// keyboardButtonUrl
		request = {[i++]:{text:"string"},[i++]:{url:"string"}}
		break
	}
	case 0x683a5e46: {// keyboardButtonCallback
		request = {[i++]:{text:"string"},[i++]:{data:"bytes"}}
		break
	}
	case 0xb16a6c29: {// keyboardButtonRequestPhone
		request = {[i++]:{text:"string"}}
		break
	}
	case 0xfc796b3f: {// keyboardButtonRequestGeoLocation
		request = {[i++]:{text:"string"}}
		break
	}
	case 0x568a748: {// keyboardButtonSwitchInline
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["same_peer","true"]])
		request[i++]=Object.fromEntries([["text","string"]])
		request[i++]=Object.fromEntries([["query","string"]])
		break
	}
	case 0x48a30254: {// replyInlineMarkup
		request = {[i++]:{rows:"Vector<KeyboardButtonRow>"}}
		break
	}
	case 0x36585ea4: {// messages.botCallbackAnswer
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["alert","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["has_url","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["native_ui","true"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["url","string"]])
		request[i++]=Object.fromEntries([["cache_time","int"]])
		break
	}
	case 0xe73547e1: {// updateBotCallbackQuery
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["query_id","long"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		request[i++]=Object.fromEntries([["peer","Peer"]])
		request[i++]=Object.fromEntries([["msg_id","int"]])
		request[i++]=Object.fromEntries([["chat_instance","long"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["data","bytes"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["game_short_name","string"]])
		break
	}
	case 0x26b5dde6: {// messages.messageEditData
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["caption","true"]])
		break
	}
	case 0xe40370a3: {// updateEditMessage
		request = {[i++]:{message:"Message"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0xc1b15d65: {// inputBotInlineMessageMediaGeo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["geo_point","InputGeoPoint"]])
		request[i++]=Object.fromEntries([["period","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0x417bbf11: {// inputBotInlineMessageMediaVenue
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["geo_point","InputGeoPoint"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["address","string"]])
		request[i++]=Object.fromEntries([["provider","string"]])
		request[i++]=Object.fromEntries([["venue_id","string"]])
		request[i++]=Object.fromEntries([["venue_type","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0xa6edbffd: {// inputBotInlineMessageMediaContact
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["phone_number","string"]])
		request[i++]=Object.fromEntries([["first_name","string"]])
		request[i++]=Object.fromEntries([["last_name","string"]])
		request[i++]=Object.fromEntries([["vcard","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0xb722de65: {// botInlineMessageMediaGeo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["geo","GeoPoint"]])
		request[i++]=Object.fromEntries([["period","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0x8a86659c: {// botInlineMessageMediaVenue
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["geo","GeoPoint"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["address","string"]])
		request[i++]=Object.fromEntries([["provider","string"]])
		request[i++]=Object.fromEntries([["venue_id","string"]])
		request[i++]=Object.fromEntries([["venue_type","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0x18d1cdc2: {// botInlineMessageMediaContact
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["phone_number","string"]])
		request[i++]=Object.fromEntries([["first_name","string"]])
		request[i++]=Object.fromEntries([["last_name","string"]])
		request[i++]=Object.fromEntries([["vcard","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0xa8d864a7: {// inputBotInlineResultPhoto
		request = {[i++]:{id:"string"},[i++]:{type:"string"},[i++]:{photo:"InputPhoto"},[i++]:{send_message:"InputBotInlineMessage"}}
		break
	}
	case 0xfff8fdc4: {// inputBotInlineResultDocument
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","string"]])
		request[i++]=Object.fromEntries([["type","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["description","string"]])
		request[i++]=Object.fromEntries([["document","InputDocument"]])
		request[i++]=Object.fromEntries([["send_message","InputBotInlineMessage"]])
		break
	}
	case 0x17db940b: {// botInlineMediaResult
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","string"]])
		request[i++]=Object.fromEntries([["type","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["photo","Photo"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["document","Document"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["description","string"]])
		request[i++]=Object.fromEntries([["send_message","BotInlineMessage"]])
		break
	}
	case 0x890c3d89: {// inputBotInlineMessageID
		request = {[i++]:{dc_id:"int"},[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xf9d27a5a: {// updateInlineBotCallbackQuery
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["query_id","long"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		request[i++]=Object.fromEntries([["msg_id","InputBotInlineMessageID"]])
		request[i++]=Object.fromEntries([["chat_instance","long"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["data","bytes"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["game_short_name","string"]])
		break
	}
	case 0x3c20629f: {// inlineBotSwitchPM
		request = {[i++]:{text:"string"},[i++]:{start_param:"string"}}
		break
	}
	case 0x3371c354: {// messages.peerDialogs
		request = {[i++]:{dialogs:"Vector<Dialog>"},[i++]:{messages:"Vector<Message>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"},[i++]:{state:"updates.State"}}
		break
	}
	case 0xedcdc05b: {// topPeer
		request = {[i++]:{peer:"Peer"},[i++]:{rating:"double"}}
		break
	}
	case 0xab661b5b: {// topPeerCategoryBotsPM
		request = {}
		break
	}
	case 0x148677e2: {// topPeerCategoryBotsInline
		request = {}
		break
	}
	case 0x637b7ed: {// topPeerCategoryCorrespondents
		request = {}
		break
	}
	case 0xbd17a14a: {// topPeerCategoryGroups
		request = {}
		break
	}
	case 0x161d9628: {// topPeerCategoryChannels
		request = {}
		break
	}
	case 0xfb834291: {// topPeerCategoryPeers
		request = {[i++]:{category:"TopPeerCategory"},[i++]:{count:"int"},[i++]:{peers:"Vector<TopPeer>"}}
		break
	}
	case 0xde266ef5: {// contacts.topPeersNotModified
		request = {}
		break
	}
	case 0x70b772a8: {// contacts.topPeers
		request = {[i++]:{categories:"Vector<TopPeerCategoryPeers>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x352dca58: {// messageEntityMentionName
		request = {[i++]:{offset:"int"},[i++]:{length:"int"},[i++]:{user_id:"int"}}
		break
	}
	case 0x208e68c9: {// inputMessageEntityMentionName
		request = {[i++]:{offset:"int"},[i++]:{length:"int"},[i++]:{user_id:"InputUser"}}
		break
	}
	case 0x3a20ecb8: {// inputMessagesFilterChatPhotos
		request = {}
		break
	}
	case 0x25d6c9c7: {// updateReadChannelOutbox
		request = {[i++]:{channel_id:"int"},[i++]:{max_id:"int"}}
		break
	}
	case 0xee2bb969: {// updateDraftMessage
		request = {[i++]:{peer:"Peer"},[i++]:{draft:"DraftMessage"}}
		break
	}
	case 0x1b0c841a: {// draftMessageEmpty
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["date","int"]])
		break
	}
	case 0xfd8e711f: {// draftMessage
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["no_webpage","true"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["reply_to_msg_id","int"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		request[i++]=Object.fromEntries([["date","int"]])
		break
	}
	case 0x9fbab604: {// messageActionHistoryClear
		request = {}
		break
	}
	case 0x4ede3cf: {// messages.featuredStickersNotModified
		request = {}
		break
	}
	case 0xf89d88e5: {// messages.featuredStickers
		request = {[i++]:{hash:"int"},[i++]:{sets:"Vector<StickerSetCovered>"},[i++]:{unread:"Vector<long>"}}
		break
	}
	case 0x571d2742: {// updateReadFeaturedStickers
		request = {}
		break
	}
	case 0xb17f890: {// messages.recentStickersNotModified
		request = {}
		break
	}
	case 0x22f3afb3: {// messages.recentStickers
		request = {[i++]:{hash:"int"},[i++]:{packs:"Vector<StickerPack>"},[i++]:{stickers:"Vector<Document>"},[i++]:{dates:"Vector<int>"}}
		break
	}
	case 0x9a422c20: {// updateRecentStickers
		request = {}
		break
	}
	case 0x4fcba9c8: {// messages.archivedStickers
		request = {[i++]:{count:"int"},[i++]:{sets:"Vector<StickerSetCovered>"}}
		break
	}
	case 0x38641628: {// messages.stickerSetInstallResultSuccess
		request = {}
		break
	}
	case 0x35e410a8: {// messages.stickerSetInstallResultArchive
		request = {[i++]:{sets:"Vector<StickerSetCovered>"}}
		break
	}
	case 0x6410a5d2: {// stickerSetCovered
		request = {[i++]:{set:"StickerSet"},[i++]:{cover:"Document"}}
		break
	}
	case 0xa229dd06: {// updateConfig
		request = {}
		break
	}
	case 0x3354678f: {// updatePtsChanged
		request = {}
		break
	}
	case 0xe5bbfe1a: {// inputMediaPhotoExternal
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["url","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0xfb52dc99: {// inputMediaDocumentExternal
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["url","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["ttl_seconds","int"]])
		break
	}
	case 0x3407e51b: {// stickerSetMultiCovered
		request = {[i++]:{set:"StickerSet"},[i++]:{covers:"Vector<Document>"}}
		break
	}
	case 0xaed6dbb2: {// maskCoords
		request = {[i++]:{n:"int"},[i++]:{x:"double"},[i++]:{y:"double"},[i++]:{zoom:"double"}}
		break
	}
	case 0x9801d2f7: {// documentAttributeHasStickers
		request = {}
		break
	}
	case 0x4a992157: {// inputStickeredMediaPhoto
		request = {[i++]:{id:"InputPhoto"}}
		break
	}
	case 0x438865b: {// inputStickeredMediaDocument
		request = {[i++]:{id:"InputDocument"}}
		break
	}
	case 0xbdf9653b: {// game
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["short_name","string"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["description","string"]])
		request[i++]=Object.fromEntries([["photo","Photo"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["document","Document"]])
		break
	}
	case 0x4fa417f2: {// inputBotInlineResultGame
		request = {[i++]:{id:"string"},[i++]:{short_name:"string"},[i++]:{send_message:"InputBotInlineMessage"}}
		break
	}
	case 0x4b425864: {// inputBotInlineMessageGame
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reply_markup","ReplyMarkup"]])
		break
	}
	case 0xfdb19008: {// messageMediaGame
		request = {[i++]:{game:"Game"}}
		break
	}
	case 0xd33f43f3: {// inputMediaGame
		request = {[i++]:{id:"InputGame"}}
		break
	}
	case 0x32c3e77: {// inputGameID
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xc331e80a: {// inputGameShortName
		request = {[i++]:{bot_id:"InputUser"},[i++]:{short_name:"string"}}
		break
	}
	case 0x50f41ccf: {// keyboardButtonGame
		request = {[i++]:{text:"string"}}
		break
	}
	case 0x92a72876: {// messageActionGameScore
		request = {[i++]:{game_id:"long"},[i++]:{score:"int"}}
		break
	}
	case 0x58fffcd0: {// highScore
		request = {[i++]:{pos:"int"},[i++]:{user_id:"int"},[i++]:{score:"int"}}
		break
	}
	case 0x9a3bfd99: {// messages.highScores
		request = {[i++]:{scores:"Vector<HighScore>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x4afe8f6d: {// updates.differenceTooLong
		request = {[i++]:{pts:"int"}}
		break
	}
	case 0x40771900: {// updateChannelWebPage
		request = {[i++]:{channel_id:"int"},[i++]:{webpage:"WebPage"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x9cd81144: {// messages.chatsSlice
		request = {[i++]:{count:"int"},[i++]:{chats:"Vector<Chat>"}}
		break
	}
	case 0xdc3d824f: {// textEmpty
		request = {}
		break
	}
	case 0x744694e0: {// textPlain
		request = {[i++]:{text:"string"}}
		break
	}
	case 0x6724abc4: {// textBold
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0xd912a59c: {// textItalic
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0xc12622c4: {// textUnderline
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x9bf8bb95: {// textStrike
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x6c3f19b9: {// textFixed
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x3c2884c1: {// textUrl
		request = {[i++]:{text:"RichText"},[i++]:{url:"string"},[i++]:{webpage_id:"long"}}
		break
	}
	case 0xde5a0dd6: {// textEmail
		request = {[i++]:{text:"RichText"},[i++]:{email:"string"}}
		break
	}
	case 0x7e6260d7: {// textConcat
		request = {[i++]:{texts:"Vector<RichText>"}}
		break
	}
	case 0x13567e8a: {// pageBlockUnsupported
		request = {}
		break
	}
	case 0x70abc3fd: {// pageBlockTitle
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x8ffa9a1f: {// pageBlockSubtitle
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0xbaafe5e0: {// pageBlockAuthorDate
		request = {[i++]:{author:"RichText"},[i++]:{published_date:"int"}}
		break
	}
	case 0xbfd064ec: {// pageBlockHeader
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0xf12bb6e1: {// pageBlockSubheader
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x467a0766: {// pageBlockParagraph
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0xc070d93e: {// pageBlockPreformatted
		request = {[i++]:{text:"RichText"},[i++]:{language:"string"}}
		break
	}
	case 0x48870999: {// pageBlockFooter
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0xdb20b188: {// pageBlockDivider
		request = {}
		break
	}
	case 0xce0d37b0: {// pageBlockAnchor
		request = {[i++]:{name:"string"}}
		break
	}
	case 0xe4e88011: {// pageBlockList
		request = {[i++]:{items:"Vector<PageListItem>"}}
		break
	}
	case 0x263d7c26: {// pageBlockBlockquote
		request = {[i++]:{text:"RichText"},[i++]:{caption:"RichText"}}
		break
	}
	case 0x4f4456d3: {// pageBlockPullquote
		request = {[i++]:{text:"RichText"},[i++]:{caption:"RichText"}}
		break
	}
	case 0x1759c560: {// pageBlockPhoto
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["photo_id","long"]])
		request[i++]=Object.fromEntries([["caption","PageCaption"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["url","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["webpage_id","long"]])
		break
	}
	case 0x7c8fe7b6: {// pageBlockVideo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["autoplay","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["loop","true"]])
		request[i++]=Object.fromEntries([["video_id","long"]])
		request[i++]=Object.fromEntries([["caption","PageCaption"]])
		break
	}
	case 0x39f23300: {// pageBlockCover
		request = {[i++]:{cover:"PageBlock"}}
		break
	}
	case 0xa8718dc5: {// pageBlockEmbed
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["full_width","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["allow_scrolling","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["url","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["html","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["poster_photo_id","long"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["w","int"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["h","int"]])
		request[i++]=Object.fromEntries([["caption","PageCaption"]])
		break
	}
	case 0xf259a80b: {// pageBlockEmbedPost
		request = {[i++]:{url:"string"},[i++]:{webpage_id:"long"},[i++]:{author_photo_id:"long"},[i++]:{author:"string"},[i++]:{date:"int"},[i++]:{blocks:"Vector<PageBlock>"},[i++]:{caption:"PageCaption"}}
		break
	}
	case 0x65a0fa4d: {// pageBlockCollage
		request = {[i++]:{items:"Vector<PageBlock>"},[i++]:{caption:"PageCaption"}}
		break
	}
	case 0x31f9590: {// pageBlockSlideshow
		request = {[i++]:{items:"Vector<PageBlock>"},[i++]:{caption:"PageCaption"}}
		break
	}
	case 0x85849473: {// webPageNotModified
		request = {}
		break
	}
	case 0xfabadc5f: {// inputPrivacyKeyPhoneCall
		request = {}
		break
	}
	case 0x3d662b7b: {// privacyKeyPhoneCall
		request = {}
		break
	}
	case 0xdd6a8f48: {// sendMessageGamePlayAction
		request = {}
		break
	}
	case 0x85e42301: {// phoneCallDiscardReasonMissed
		request = {}
		break
	}
	case 0xe095c1a0: {// phoneCallDiscardReasonDisconnect
		request = {}
		break
	}
	case 0x57adc690: {// phoneCallDiscardReasonHangup
		request = {}
		break
	}
	case 0xfaf7e8c9: {// phoneCallDiscardReasonBusy
		request = {}
		break
	}
	case 0x6e6fe51c: {// updateDialogPinned
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["pinned","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["folder_id","int"]])
		request[i++]=Object.fromEntries([["peer","DialogPeer"]])
		break
	}
	case 0xfa0f3ca2: {// updatePinnedDialogs
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["folder_id","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["order","Vector<DialogPeer>"]])
		break
	}
	case 0x7d748d04: {// dataJSON
		request = {[i++]:{data:"string"}}
		break
	}
	case 0x8317c0c3: {// updateBotWebhookJSON
		request = {[i++]:{data:"DataJSON"}}
		break
	}
	case 0x9b9240a6: {// updateBotWebhookJSONQuery
		request = {[i++]:{query_id:"long"},[i++]:{data:"DataJSON"},[i++]:{timeout:"int"}}
		break
	}
	case 0xcb296bf8: {// labeledPrice
		request = {[i++]:{label:"string"},[i++]:{amount:"long"}}
		break
	}
	case 0xc30aa358: {// invoice
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["test","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["name_requested","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["phone_requested","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["email_requested","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["shipping_address_requested","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["flexible","true"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["phone_to_provider","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["email_to_provider","true"]])
		request[i++]=Object.fromEntries([["currency","string"]])
		request[i++]=Object.fromEntries([["prices","Vector<LabeledPrice>"]])
		break
	}
	case 0xf4e096c3: {// inputMediaInvoice
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["description","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["photo","InputWebDocument"]])
		request[i++]=Object.fromEntries([["invoice","Invoice"]])
		request[i++]=Object.fromEntries([["payload","bytes"]])
		request[i++]=Object.fromEntries([["provider","string"]])
		request[i++]=Object.fromEntries([["provider_data","DataJSON"]])
		request[i++]=Object.fromEntries([["start_param","string"]])
		break
	}
	case 0xea02c27e: {// paymentCharge
		request = {[i++]:{id:"string"},[i++]:{provider_charge_id:"string"}}
		break
	}
	case 0x8f31b327: {// messageActionPaymentSentMe
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["currency","string"]])
		request[i++]=Object.fromEntries([["total_amount","long"]])
		request[i++]=Object.fromEntries([["payload","bytes"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["info","PaymentRequestedInfo"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["shipping_option_id","string"]])
		request[i++]=Object.fromEntries([["charge","PaymentCharge"]])
		break
	}
	case 0x84551347: {// messageMediaInvoice
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["shipping_address_requested","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["test","true"]])
		request[i++]=Object.fromEntries([["title","string"]])
		request[i++]=Object.fromEntries([["description","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["photo","WebDocument"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["receipt_msg_id","int"]])
		request[i++]=Object.fromEntries([["currency","string"]])
		request[i++]=Object.fromEntries([["total_amount","long"]])
		request[i++]=Object.fromEntries([["start_param","string"]])
		break
	}
	case 0x1e8caaeb: {// postAddress
		request = {[i++]:{street_line1:"string"},[i++]:{street_line2:"string"},[i++]:{city:"string"},[i++]:{state:"string"},[i++]:{country_iso2:"string"},[i++]:{post_code:"string"}}
		break
	}
	case 0x909c3f94: {// paymentRequestedInfo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["name","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["phone","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["email","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["shipping_address","PostAddress"]])
		break
	}
	case 0xafd93fbb: {// keyboardButtonBuy
		request = {[i++]:{text:"string"}}
		break
	}
	case 0x40699cd0: {// messageActionPaymentSent
		request = {[i++]:{currency:"string"},[i++]:{total_amount:"long"}}
		break
	}
	case 0xcdc27a1f: {// paymentSavedCredentialsCard
		request = {[i++]:{id:"string"},[i++]:{title:"string"}}
		break
	}
	case 0x1c570ed1: {// webDocument
		request = {[i++]:{url:"string"},[i++]:{access_hash:"long"},[i++]:{size:"int"},[i++]:{mime_type:"string"},[i++]:{attributes:"Vector<DocumentAttribute>"}}
		break
	}
	case 0x9bed434d: {// inputWebDocument
		request = {[i++]:{url:"string"},[i++]:{size:"int"},[i++]:{mime_type:"string"},[i++]:{attributes:"Vector<DocumentAttribute>"}}
		break
	}
	case 0xc239d686: {// inputWebFileLocation
		request = {[i++]:{url:"string"},[i++]:{access_hash:"long"}}
		break
	}
	case 0x21e753bc: {// upload.webFile
		request = {[i++]:{size:"int"},[i++]:{mime_type:"string"},[i++]:{file_type:"storage.FileType"},[i++]:{mtime:"int"},[i++]:{bytes:"bytes"}}
		break
	}
	case 0x3f56aea3: {// payments.paymentForm
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["can_save_credentials","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["password_missing","true"]])
		request[i++]=Object.fromEntries([["bot_id","int"]])
		request[i++]=Object.fromEntries([["invoice","Invoice"]])
		request[i++]=Object.fromEntries([["provider_id","int"]])
		request[i++]=Object.fromEntries([["url","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["native_provider","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["native_params","DataJSON"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["saved_info","PaymentRequestedInfo"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["saved_credentials","PaymentSavedCredentials"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		break
	}
	case 0xd1451883: {// payments.validatedRequestedInfo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["id","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["shipping_options","Vector<ShippingOption>"]])
		break
	}
	case 0x4e5f810d: {// payments.paymentResult
		request = {[i++]:{updates:"Updates"}}
		break
	}
	case 0x500911e1: {// payments.paymentReceipt
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["bot_id","int"]])
		request[i++]=Object.fromEntries([["invoice","Invoice"]])
		request[i++]=Object.fromEntries([["provider_id","int"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["info","PaymentRequestedInfo"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["shipping","ShippingOption"]])
		request[i++]=Object.fromEntries([["currency","string"]])
		request[i++]=Object.fromEntries([["total_amount","long"]])
		request[i++]=Object.fromEntries([["credentials_title","string"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		break
	}
	case 0xfb8fe43c: {// payments.savedInfo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["has_saved_credentials","true"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["saved_info","PaymentRequestedInfo"]])
		break
	}
	case 0xc10eb2cf: {// inputPaymentCredentialsSaved
		request = {[i++]:{id:"string"},[i++]:{tmp_password:"bytes"}}
		break
	}
	case 0x3417d728: {// inputPaymentCredentials
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["save","true"]])
		request[i++]=Object.fromEntries([["data","DataJSON"]])
		break
	}
	case 0xdb64fd34: {// account.tmpPassword
		request = {[i++]:{tmp_password:"bytes"},[i++]:{valid_until:"int"}}
		break
	}
	case 0xb6213cdf: {// shippingOption
		request = {[i++]:{id:"string"},[i++]:{title:"string"},[i++]:{prices:"Vector<LabeledPrice>"}}
		break
	}
	case 0xe0cdc940: {// updateBotShippingQuery
		request = {[i++]:{query_id:"long"},[i++]:{user_id:"int"},[i++]:{payload:"bytes"},[i++]:{shipping_address:"PostAddress"}}
		break
	}
	case 0x5d2f3aa9: {// updateBotPrecheckoutQuery
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["query_id","long"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		request[i++]=Object.fromEntries([["payload","bytes"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["info","PaymentRequestedInfo"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["shipping_option_id","string"]])
		request[i++]=Object.fromEntries([["currency","string"]])
		request[i++]=Object.fromEntries([["total_amount","long"]])
		break
	}
	case 0xffa0a496: {// inputStickerSetItem
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["document","InputDocument"]])
		request[i++]=Object.fromEntries([["emoji","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["mask_coords","MaskCoords"]])
		break
	}
	case 0xab0f6b1e: {// updatePhoneCall
		request = {[i++]:{phone_call:"PhoneCall"}}
		break
	}
	case 0x1e36fded: {// inputPhoneCall
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0x5366c915: {// phoneCallEmpty
		request = {[i++]:{id:"long"}}
		break
	}
	case 0x1b8f4ad1: {// phoneCallWaiting
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["video","true"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["admin_id","int"]])
		request[i++]=Object.fromEntries([["participant_id","int"]])
		request[i++]=Object.fromEntries([["protocol","PhoneCallProtocol"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["receive_date","int"]])
		break
	}
	case 0x87eabb53: {// phoneCallRequested
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["video","true"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["admin_id","int"]])
		request[i++]=Object.fromEntries([["participant_id","int"]])
		request[i++]=Object.fromEntries([["g_a_hash","bytes"]])
		request[i++]=Object.fromEntries([["protocol","PhoneCallProtocol"]])
		break
	}
	case 0x997c454a: {// phoneCallAccepted
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["video","true"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["admin_id","int"]])
		request[i++]=Object.fromEntries([["participant_id","int"]])
		request[i++]=Object.fromEntries([["g_b","bytes"]])
		request[i++]=Object.fromEntries([["protocol","PhoneCallProtocol"]])
		break
	}
	case 0x8742ae7f: {// phoneCall
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["p2p_allowed","true"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["admin_id","int"]])
		request[i++]=Object.fromEntries([["participant_id","int"]])
		request[i++]=Object.fromEntries([["g_a_or_b","bytes"]])
		request[i++]=Object.fromEntries([["key_fingerprint","long"]])
		request[i++]=Object.fromEntries([["protocol","PhoneCallProtocol"]])
		request[i++]=Object.fromEntries([["connections","Vector<PhoneConnection>"]])
		request[i++]=Object.fromEntries([["start_date","int"]])
		break
	}
	case 0x50ca4de1: {// phoneCallDiscarded
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["need_rating","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["need_debug","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["video","true"]])
		request[i++]=Object.fromEntries([["id","long"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["reason","PhoneCallDiscardReason"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["duration","int"]])
		break
	}
	case 0x9d4c17c0: {// phoneConnection
		request = {[i++]:{id:"long"},[i++]:{ip:"string"},[i++]:{ipv6:"string"},[i++]:{port:"int"},[i++]:{peer_tag:"bytes"}}
		break
	}
	case 0xa2bb35cb: {// phoneCallProtocol
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["udp_p2p","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["udp_reflector","true"]])
		request[i++]=Object.fromEntries([["min_layer","int"]])
		request[i++]=Object.fromEntries([["max_layer","int"]])
		break
	}
	case 0xec82e140: {// phone.phoneCall
		request = {[i++]:{phone_call:"PhoneCall"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0x80c99768: {// inputMessagesFilterPhoneCalls
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["missed","true"]])
		break
	}
	case 0x80e11a7f: {// messageActionPhoneCall
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["video","true"]])
		request[i++]=Object.fromEntries([["call_id","long"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["reason","PhoneCallDiscardReason"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["duration","int"]])
		break
	}
	case 0x7a7c17a4: {// inputMessagesFilterRoundVoice
		request = {}
		break
	}
	case 0xb549da53: {// inputMessagesFilterRoundVideo
		request = {}
		break
	}
	case 0x88f27fbc: {// sendMessageRecordRoundAction
		request = {}
		break
	}
	case 0x243e1c66: {// sendMessageUploadRoundAction
		request = {[i++]:{progress:"int"}}
		break
	}
	case 0xf18cda44: {// upload.fileCdnRedirect
		request = {[i++]:{dc_id:"int"},[i++]:{file_token:"bytes"},[i++]:{encryption_key:"bytes"},[i++]:{encryption_iv:"bytes"},[i++]:{file_hashes:"Vector<FileHash>"}}
		break
	}
	case 0xeea8e46e: {// upload.cdnFileReuploadNeeded
		request = {[i++]:{request_token:"bytes"}}
		break
	}
	case 0xa99fca4f: {// upload.cdnFile
		request = {[i++]:{bytes:"bytes"}}
		break
	}
	case 0xc982eaba: {// cdnPublicKey
		request = {[i++]:{dc_id:"int"},[i++]:{public_key:"string"}}
		break
	}
	case 0x5725e40a: {// cdnConfig
		request = {[i++]:{public_keys:"Vector<CdnPublicKey>"}}
		break
	}
	case 0xef1751b5: {// pageBlockChannel
		request = {[i++]:{channel:"Chat"}}
		break
	}
	case 0xcad181f6: {// langPackString
		request = {[i++]:{key:"string"},[i++]:{value:"string"}}
		break
	}
	case 0x6c47ac9f: {// langPackStringPluralized
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["key","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["zero_value","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["one_value","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["two_value","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["few_value","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["many_value","string"]])
		request[i++]=Object.fromEntries([["other_value","string"]])
		break
	}
	case 0x2979eeb2: {// langPackStringDeleted
		request = {[i++]:{key:"string"}}
		break
	}
	case 0xf385c1f6: {// langPackDifference
		request = {[i++]:{lang_code:"string"},[i++]:{from_version:"int"},[i++]:{version:"int"},[i++]:{strings:"Vector<LangPackString>"}}
		break
	}
	case 0xeeca5ce3: {// langPackLanguage
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["official","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["rtl","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["beta","true"]])
		request[i++]=Object.fromEntries([["name","string"]])
		request[i++]=Object.fromEntries([["native_name","string"]])
		request[i++]=Object.fromEntries([["lang_code","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["base_lang_code","string"]])
		request[i++]=Object.fromEntries([["plural_code","string"]])
		request[i++]=Object.fromEntries([["strings_count","int"]])
		request[i++]=Object.fromEntries([["translated_count","int"]])
		request[i++]=Object.fromEntries([["translations_url","string"]])
		break
	}
	case 0x46560264: {// updateLangPackTooLong
		request = {[i++]:{lang_code:"string"}}
		break
	}
	case 0x56022f4d: {// updateLangPack
		request = {[i++]:{difference:"LangPackDifference"}}
		break
	}
	case 0xccbebbaf: {// channelParticipantAdmin
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["can_edit","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["self","true"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["inviter_id","int"]])
		request[i++]=Object.fromEntries([["promoted_by","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["admin_rights","ChatAdminRights"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["rank","string"]])
		break
	}
	case 0x1c0facaf: {// channelParticipantBanned
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["left","true"]])
		request[i++]=Object.fromEntries([["user_id","int"]])
		request[i++]=Object.fromEntries([["kicked_by","int"]])
		request[i++]=Object.fromEntries([["date","int"]])
		request[i++]=Object.fromEntries([["banned_rights","ChatBannedRights"]])
		break
	}
	case 0x1427a5e1: {// channelParticipantsBanned
		request = {[i++]:{q:"string"}}
		break
	}
	case 0x656ac4b: {// channelParticipantsSearch
		request = {[i++]:{q:"string"}}
		break
	}
	case 0xe6dfb825: {// channelAdminLogEventActionChangeTitle
		request = {[i++]:{prev_value:"string"},[i++]:{new_value:"string"}}
		break
	}
	case 0x55188a2e: {// channelAdminLogEventActionChangeAbout
		request = {[i++]:{prev_value:"string"},[i++]:{new_value:"string"}}
		break
	}
	case 0x6a4afc38: {// channelAdminLogEventActionChangeUsername
		request = {[i++]:{prev_value:"string"},[i++]:{new_value:"string"}}
		break
	}
	case 0x434bd2af: {// channelAdminLogEventActionChangePhoto
		request = {[i++]:{prev_photo:"Photo"},[i++]:{new_photo:"Photo"}}
		break
	}
	case 0x1b7907ae: {// channelAdminLogEventActionToggleInvites
		request = {[i++]:{new_value:"Bool"}}
		break
	}
	case 0x26ae0971: {// channelAdminLogEventActionToggleSignatures
		request = {[i++]:{new_value:"Bool"}}
		break
	}
	case 0xe9e82c18: {// channelAdminLogEventActionUpdatePinned
		request = {[i++]:{message:"Message"}}
		break
	}
	case 0x709b2405: {// channelAdminLogEventActionEditMessage
		request = {[i++]:{prev_message:"Message"},[i++]:{new_message:"Message"}}
		break
	}
	case 0x42e047bb: {// channelAdminLogEventActionDeleteMessage
		request = {[i++]:{message:"Message"}}
		break
	}
	case 0x183040d3: {// channelAdminLogEventActionParticipantJoin
		request = {}
		break
	}
	case 0xf89777f2: {// channelAdminLogEventActionParticipantLeave
		request = {}
		break
	}
	case 0xe31c34d8: {// channelAdminLogEventActionParticipantInvite
		request = {[i++]:{participant:"ChannelParticipant"}}
		break
	}
	case 0xe6d83d7e: {// channelAdminLogEventActionParticipantToggleBan
		request = {[i++]:{prev_participant:"ChannelParticipant"},[i++]:{new_participant:"ChannelParticipant"}}
		break
	}
	case 0xd5676710: {// channelAdminLogEventActionParticipantToggleAdmin
		request = {[i++]:{prev_participant:"ChannelParticipant"},[i++]:{new_participant:"ChannelParticipant"}}
		break
	}
	case 0x3b5a3e40: {// channelAdminLogEvent
		request = {[i++]:{id:"long"},[i++]:{date:"int"},[i++]:{user_id:"int"},[i++]:{action:"ChannelAdminLogEventAction"}}
		break
	}
	case 0xed8af74d: {// channels.adminLogResults
		request = {[i++]:{events:"Vector<ChannelAdminLogEvent>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xea107ae4: {// channelAdminLogEventsFilter
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["join","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["leave","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["invite","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["ban","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["unban","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["kick","true"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["unkick","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["promote","true"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["demote","true"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["info","true"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["settings","true"]])
		if(_flags & (1 << 11)) request[i++]=Object.fromEntries([["pinned","true"]])
		if(_flags & (1 << 12)) request[i++]=Object.fromEntries([["edit","true"]])
		if(_flags & (1 << 13)) request[i++]=Object.fromEntries([["delete","true"]])
		break
	}
	case 0x1e76a78c: {// topPeerCategoryPhoneCalls
		request = {}
		break
	}
	case 0x804361ea: {// pageBlockAudio
		request = {[i++]:{audio_id:"long"},[i++]:{caption:"PageCaption"}}
		break
	}
	case 0x5ce14175: {// popularContact
		request = {[i++]:{client_id:"long"},[i++]:{importers:"int"}}
		break
	}
	case 0x4792929b: {// messageActionScreenshotTaken
		request = {}
		break
	}
	case 0x9e8fa6d3: {// messages.favedStickersNotModified
		request = {}
		break
	}
	case 0xf37f2f16: {// messages.favedStickers
		request = {[i++]:{hash:"int"},[i++]:{packs:"Vector<StickerPack>"},[i++]:{stickers:"Vector<Document>"}}
		break
	}
	case 0xe511996d: {// updateFavedStickers
		request = {}
		break
	}
	case 0x89893b45: {// updateChannelReadMessagesContents
		request = {[i++]:{channel_id:"int"},[i++]:{messages:"Vector<int>"}}
		break
	}
	case 0xc1f8e69a: {// inputMessagesFilterMyMentions
		request = {}
		break
	}
	case 0x7084a7be: {// updateContactsReset
		request = {}
		break
	}
	case 0xb1c3caa7: {// channelAdminLogEventActionChangeStickerSet
		request = {[i++]:{prev_stickerset:"InputStickerSet"},[i++]:{new_stickerset:"InputStickerSet"}}
		break
	}
	case 0xfae69f56: {// messageActionCustomAction
		request = {[i++]:{message:"string"}}
		break
	}
	case 0xaa1c39f: {// inputPaymentCredentialsApplePay
		request = {[i++]:{payment_data:"DataJSON"}}
		break
	}
	case 0xca05d50e: {// inputPaymentCredentialsAndroidPay
		request = {[i++]:{payment_token:"DataJSON"},[i++]:{google_transaction_id:"string"}}
		break
	}
	case 0xe7026d0d: {// inputMessagesFilterGeo
		request = {}
		break
	}
	case 0xe062db83: {// inputMessagesFilterContacts
		request = {}
		break
	}
	case 0x70db6837: {// updateChannelAvailableMessages
		request = {[i++]:{channel_id:"int"},[i++]:{available_min_id:"int"}}
		break
	}
	case 0x5f5c95f1: {// channelAdminLogEventActionTogglePreHistoryHidden
		request = {[i++]:{new_value:"Bool"}}
		break
	}
	case 0xce4e82fd: {// inputMediaGeoLive
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["stopped","true"]])
		request[i++]=Object.fromEntries([["geo_point","InputGeoPoint"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["period","int"]])
		break
	}
	case 0x7c3c2609: {// messageMediaGeoLive
		request = {[i++]:{geo:"GeoPoint"},[i++]:{period:"int"}}
		break
	}
	case 0x46e1d13d: {// recentMeUrlUnknown
		request = {[i++]:{url:"string"}}
		break
	}
	case 0x8dbc3336: {// recentMeUrlUser
		request = {[i++]:{url:"string"},[i++]:{user_id:"int"}}
		break
	}
	case 0xa01b22f9: {// recentMeUrlChat
		request = {[i++]:{url:"string"},[i++]:{chat_id:"int"}}
		break
	}
	case 0xeb49081d: {// recentMeUrlChatInvite
		request = {[i++]:{url:"string"},[i++]:{chat_invite:"ChatInvite"}}
		break
	}
	case 0xbc0a57dc: {// recentMeUrlStickerSet
		request = {[i++]:{url:"string"},[i++]:{set:"StickerSetCovered"}}
		break
	}
	case 0xe0310d7: {// help.recentMeUrls
		request = {[i++]:{urls:"Vector<RecentMeUrl>"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xf0173fe9: {// channels.channelParticipantsNotModified
		request = {}
		break
	}
	case 0x74535f21: {// messages.messagesNotModified
		request = {[i++]:{count:"int"}}
		break
	}
	case 0x1cc6e91f: {// inputSingleMedia
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["media","InputMedia"]])
		request[i++]=Object.fromEntries([["random_id","long"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		break
	}
	case 0xcac943f2: {// webAuthorization
		request = {[i++]:{hash:"long"},[i++]:{bot_id:"int"},[i++]:{domain:"string"},[i++]:{browser:"string"},[i++]:{platform:"string"},[i++]:{date_created:"int"},[i++]:{date_active:"int"},[i++]:{ip:"string"},[i++]:{region:"string"}}
		break
	}
	case 0xed56c9fc: {// account.webAuthorizations
		request = {[i++]:{authorizations:"Vector<WebAuthorization>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xa676a322: {// inputMessageID
		request = {[i++]:{id:"int"}}
		break
	}
	case 0xbad88395: {// inputMessageReplyTo
		request = {[i++]:{id:"int"}}
		break
	}
	case 0x86872538: {// inputMessagePinned
		request = {}
		break
	}
	case 0x9b69e34b: {// messageEntityPhone
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x4c4e743f: {// messageEntityCashtag
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0xabe9affe: {// messageActionBotAllowed
		request = {[i++]:{domain:"string"}}
		break
	}
	case 0xfcaafeb7: {// inputDialogPeer
		request = {[i++]:{peer:"InputPeer"}}
		break
	}
	case 0xe56dbf05: {// dialogPeer
		request = {[i++]:{peer:"Peer"}}
		break
	}
	case 0xd54b65d: {// messages.foundStickerSetsNotModified
		request = {}
		break
	}
	case 0x5108d648: {// messages.foundStickerSets
		request = {[i++]:{hash:"int"},[i++]:{sets:"Vector<StickerSetCovered>"}}
		break
	}
	case 0x6242c773: {// fileHash
		request = {[i++]:{offset:"int"},[i++]:{limit:"int"},[i++]:{hash:"bytes"}}
		break
	}
	case 0xf9c8bcc6: {// webDocumentNoProxy
		request = {[i++]:{url:"string"},[i++]:{size:"int"},[i++]:{mime_type:"string"},[i++]:{attributes:"Vector<DocumentAttribute>"}}
		break
	}
	case 0x75588b3f: {// inputClientProxy
		request = {[i++]:{address:"string"},[i++]:{port:"int"}}
		break
	}
	case 0xe09e1fb8: {// help.proxyDataEmpty
		request = {[i++]:{expires:"int"}}
		break
	}
	case 0x2bf7ee23: {// help.proxyDataPromo
		request = {[i++]:{expires:"int"},[i++]:{peer:"Peer"},[i++]:{chats:"Vector<Chat>"},[i++]:{users:"Vector<User>"}}
		break
	}
	case 0xe3309f7f: {// help.termsOfServiceUpdateEmpty
		request = {[i++]:{expires:"int"}}
		break
	}
	case 0x28ecf961: {// help.termsOfServiceUpdate
		request = {[i++]:{expires:"int"},[i++]:{terms_of_service:"help.TermsOfService"}}
		break
	}
	case 0x3334b0f0: {// inputSecureFileUploaded
		request = {[i++]:{id:"long"},[i++]:{parts:"int"},[i++]:{md5_checksum:"string"},[i++]:{file_hash:"bytes"},[i++]:{secret:"bytes"}}
		break
	}
	case 0x5367e5be: {// inputSecureFile
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xcbc7ee28: {// inputSecureFileLocation
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0x64199744: {// secureFileEmpty
		request = {}
		break
	}
	case 0xe0277a62: {// secureFile
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"},[i++]:{size:"int"},[i++]:{dc_id:"int"},[i++]:{date:"int"},[i++]:{file_hash:"bytes"},[i++]:{secret:"bytes"}}
		break
	}
	case 0x8aeabec3: {// secureData
		request = {[i++]:{data:"bytes"},[i++]:{data_hash:"bytes"},[i++]:{secret:"bytes"}}
		break
	}
	case 0x7d6099dd: {// securePlainPhone
		request = {[i++]:{phone:"string"}}
		break
	}
	case 0x21ec5a5f: {// securePlainEmail
		request = {[i++]:{email:"string"}}
		break
	}
	case 0x9d2a81e3: {// secureValueTypePersonalDetails
		request = {}
		break
	}
	case 0x3dac6a00: {// secureValueTypePassport
		request = {}
		break
	}
	case 0x6e425c4: {// secureValueTypeDriverLicense
		request = {}
		break
	}
	case 0xa0d0744b: {// secureValueTypeIdentityCard
		request = {}
		break
	}
	case 0x99a48f23: {// secureValueTypeInternalPassport
		request = {}
		break
	}
	case 0xcbe31e26: {// secureValueTypeAddress
		request = {}
		break
	}
	case 0xfc36954e: {// secureValueTypeUtilityBill
		request = {}
		break
	}
	case 0x89137c0d: {// secureValueTypeBankStatement
		request = {}
		break
	}
	case 0x8b883488: {// secureValueTypeRentalAgreement
		request = {}
		break
	}
	case 0x99e3806a: {// secureValueTypePassportRegistration
		request = {}
		break
	}
	case 0xea02ec33: {// secureValueTypeTemporaryRegistration
		request = {}
		break
	}
	case 0xb320aadb: {// secureValueTypePhone
		request = {}
		break
	}
	case 0x8e3ca7ee: {// secureValueTypeEmail
		request = {}
		break
	}
	case 0x187fa0ca: {// secureValue
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["type","SecureValueType"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["data","SecureData"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["front_side","SecureFile"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reverse_side","SecureFile"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["selfie","SecureFile"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["translation","Vector<SecureFile>"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["files","Vector<SecureFile>"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["plain_data","SecurePlainData"]])
		request[i++]=Object.fromEntries([["hash","bytes"]])
		break
	}
	case 0xdb21d0a7: {// inputSecureValue
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["type","SecureValueType"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["data","SecureData"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["front_side","InputSecureFile"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["reverse_side","InputSecureFile"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["selfie","InputSecureFile"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["translation","Vector<InputSecureFile>"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["files","Vector<InputSecureFile>"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["plain_data","SecurePlainData"]])
		break
	}
	case 0xed1ecdb0: {// secureValueHash
		request = {[i++]:{type:"SecureValueType"},[i++]:{hash:"bytes"}}
		break
	}
	case 0xe8a40bd9: {// secureValueErrorData
		request = {[i++]:{type:"SecureValueType"},[i++]:{data_hash:"bytes"},[i++]:{field:"string"},[i++]:{text:"string"}}
		break
	}
	case 0xbe3dfa: {// secureValueErrorFrontSide
		request = {[i++]:{type:"SecureValueType"},[i++]:{file_hash:"bytes"},[i++]:{text:"string"}}
		break
	}
	case 0x868a2aa5: {// secureValueErrorReverseSide
		request = {[i++]:{type:"SecureValueType"},[i++]:{file_hash:"bytes"},[i++]:{text:"string"}}
		break
	}
	case 0xe537ced6: {// secureValueErrorSelfie
		request = {[i++]:{type:"SecureValueType"},[i++]:{file_hash:"bytes"},[i++]:{text:"string"}}
		break
	}
	case 0x7a700873: {// secureValueErrorFile
		request = {[i++]:{type:"SecureValueType"},[i++]:{file_hash:"bytes"},[i++]:{text:"string"}}
		break
	}
	case 0x666220e9: {// secureValueErrorFiles
		request = {[i++]:{type:"SecureValueType"},[i++]:{file_hash:"Vector<bytes>"},[i++]:{text:"string"}}
		break
	}
	case 0x33f0ea47: {// secureCredentialsEncrypted
		request = {[i++]:{data:"bytes"},[i++]:{hash:"bytes"},[i++]:{secret:"bytes"}}
		break
	}
	case 0xad2e1cd8: {// account.authorizationForm
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["required_types","Vector<SecureRequiredType>"]])
		request[i++]=Object.fromEntries([["values","Vector<SecureValue>"]])
		request[i++]=Object.fromEntries([["errors","Vector<SecureValueError>"]])
		request[i++]=Object.fromEntries([["users","Vector<User>"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["privacy_policy_url","string"]])
		break
	}
	case 0x811f854f: {// account.sentEmailCode
		request = {[i++]:{email_pattern:"string"},[i++]:{length:"int"}}
		break
	}
	case 0x1b287353: {// messageActionSecureValuesSentMe
		request = {[i++]:{values:"Vector<SecureValue>"},[i++]:{credentials:"SecureCredentialsEncrypted"}}
		break
	}
	case 0xd95c6154: {// messageActionSecureValuesSent
		request = {[i++]:{types:"Vector<SecureValueType>"}}
		break
	}
	case 0x66afa166: {// help.deepLinkInfoEmpty
		request = {}
		break
	}
	case 0x6a4ee832: {// help.deepLinkInfo
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["update_app","true"]])
		request[i++]=Object.fromEntries([["message","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["entities","Vector<MessageEntity>"]])
		break
	}
	case 0x1142bd56: {// savedPhoneContact
		request = {[i++]:{phone:"string"},[i++]:{first_name:"string"},[i++]:{last_name:"string"},[i++]:{date:"int"}}
		break
	}
	case 0x4dba4501: {// account.takeout
		request = {[i++]:{id:"long"}}
		break
	}
	case 0x29be5899: {// inputTakeoutFileLocation
		request = {}
		break
	}
	case 0xe16459c3: {// updateDialogUnreadMark
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["unread","true"]])
		request[i++]=Object.fromEntries([["peer","DialogPeer"]])
		break
	}
	case 0xf0e3e596: {// messages.dialogsNotModified
		request = {[i++]:{count:"int"}}
		break
	}
	case 0x9f2221c9: {// inputWebFileGeoPointLocation
		request = {[i++]:{geo_point:"InputGeoPoint"},[i++]:{access_hash:"long"},[i++]:{w:"int"},[i++]:{h:"int"},[i++]:{zoom:"int"},[i++]:{scale:"int"}}
		break
	}
	case 0xb52c939d: {// contacts.topPeersDisabled
		request = {}
		break
	}
	case 0x9b89f93a: {// inputReportReasonCopyright
		request = {}
		break
	}
	case 0xd45ab096: {// passwordKdfAlgoUnknown
		request = {}
		break
	}
	case 0x4a8537: {// securePasswordKdfAlgoUnknown
		request = {}
		break
	}
	case 0xbbf2dda0: {// securePasswordKdfAlgoPBKDF2HMACSHA512iter100000
		request = {[i++]:{salt:"bytes"}}
		break
	}
	case 0x86471d92: {// securePasswordKdfAlgoSHA512
		request = {[i++]:{salt:"bytes"}}
		break
	}
	case 0x1527bcac: {// secureSecretSettings
		request = {[i++]:{secure_algo:"SecurePasswordKdfAlgo"},[i++]:{secure_secret:"bytes"},[i++]:{secure_secret_id:"long"}}
		break
	}
	case 0x3a912d4a: {// passwordKdfAlgoSHA256SHA256PBKDF2HMACSHA512iter100000SHA256ModPow
		request = {[i++]:{salt1:"bytes"},[i++]:{salt2:"bytes"},[i++]:{g:"int"},[i++]:{p:"bytes"}}
		break
	}
	case 0x9880f658: {// inputCheckPasswordEmpty
		request = {}
		break
	}
	case 0xd27ff082: {// inputCheckPasswordSRP
		request = {[i++]:{srp_id:"long"},[i++]:{A:"bytes"},[i++]:{M1:"bytes"}}
		break
	}
	case 0x869d758f: {// secureValueError
		request = {[i++]:{type:"SecureValueType"},[i++]:{hash:"bytes"},[i++]:{text:"string"}}
		break
	}
	case 0xa1144770: {// secureValueErrorTranslationFile
		request = {[i++]:{type:"SecureValueType"},[i++]:{file_hash:"bytes"},[i++]:{text:"string"}}
		break
	}
	case 0x34636dd8: {// secureValueErrorTranslationFiles
		request = {[i++]:{type:"SecureValueType"},[i++]:{file_hash:"Vector<bytes>"},[i++]:{text:"string"}}
		break
	}
	case 0x829d99da: {// secureRequiredType
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["native_names","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["selfie_required","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["translation_required","true"]])
		request[i++]=Object.fromEntries([["type","SecureValueType"]])
		break
	}
	case 0x27477b4: {// secureRequiredTypeOneOf
		request = {[i++]:{types:"Vector<SecureRequiredType>"}}
		break
	}
	case 0xbfb9f457: {// help.passportConfigNotModified
		request = {}
		break
	}
	case 0xa098d6af: {// help.passportConfig
		request = {[i++]:{hash:"int"},[i++]:{countries_langs:"DataJSON"}}
		break
	}
	case 0x1d1b1245: {// inputAppEvent
		request = {[i++]:{time:"double"},[i++]:{type:"string"},[i++]:{peer:"long"},[i++]:{data:"JSONValue"}}
		break
	}
	case 0xc0de1bd9: {// jsonObjectValue
		request = {[i++]:{key:"string"},[i++]:{value:"JSONValue"}}
		break
	}
	case 0x3f6d7b68: {// jsonNull
		request = {}
		break
	}
	case 0xc7345e6a: {// jsonBool
		request = {[i++]:{value:"Bool"}}
		break
	}
	case 0x2be0dfa4: {// jsonNumber
		request = {[i++]:{value:"double"}}
		break
	}
	case 0xb71e767a: {// jsonString
		request = {[i++]:{value:"string"}}
		break
	}
	case 0xf7444763: {// jsonArray
		request = {[i++]:{value:"Vector<JSONValue>"}}
		break
	}
	case 0x99c1d49d: {// jsonObject
		request = {[i++]:{value:"Vector<JSONObjectValue>"}}
		break
	}
	case 0x4c43da18: {// updateUserPinnedMessage
		request = {[i++]:{user_id:"int"},[i++]:{id:"int"}}
		break
	}
	case 0xe10db349: {// updateChatPinnedMessage
		request = {[i++]:{chat_id:"int"},[i++]:{id:"int"},[i++]:{version:"int"}}
		break
	}
	case 0xb1db7c7e: {// inputNotifyBroadcasts
		request = {}
		break
	}
	case 0xd612e8ef: {// notifyBroadcasts
		request = {}
		break
	}
	case 0xed6a8504: {// textSubscript
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0xc7fb5e01: {// textSuperscript
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x34b8621: {// textMarked
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x1ccb966a: {// textPhone
		request = {[i++]:{text:"RichText"},[i++]:{phone:"string"}}
		break
	}
	case 0x81ccf4f: {// textImage
		request = {[i++]:{document_id:"long"},[i++]:{w:"int"},[i++]:{h:"int"}}
		break
	}
	case 0x1e148390: {// pageBlockKicker
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x34566b6a: {// pageTableCell
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["header","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["align_center","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["align_right","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["valign_middle","true"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["valign_bottom","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["text","RichText"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["colspan","int"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["rowspan","int"]])
		break
	}
	case 0xe0c0c5e5: {// pageTableRow
		request = {[i++]:{cells:"Vector<PageTableCell>"}}
		break
	}
	case 0xbf4dea82: {// pageBlockTable
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["bordered","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["striped","true"]])
		request[i++]=Object.fromEntries([["title","RichText"]])
		request[i++]=Object.fromEntries([["rows","Vector<PageTableRow>"]])
		break
	}
	case 0x6f747657: {// pageCaption
		request = {[i++]:{text:"RichText"},[i++]:{credit:"RichText"}}
		break
	}
	case 0xb92fb6cd: {// pageListItemText
		request = {[i++]:{text:"RichText"}}
		break
	}
	case 0x25e073fc: {// pageListItemBlocks
		request = {[i++]:{blocks:"Vector<PageBlock>"}}
		break
	}
	case 0x5e068047: {// pageListOrderedItemText
		request = {[i++]:{num:"string"},[i++]:{text:"RichText"}}
		break
	}
	case 0x98dd8936: {// pageListOrderedItemBlocks
		request = {[i++]:{num:"string"},[i++]:{blocks:"Vector<PageBlock>"}}
		break
	}
	case 0x9a8ae1e1: {// pageBlockOrderedList
		request = {[i++]:{items:"Vector<PageListOrderedItem>"}}
		break
	}
	case 0x76768bed: {// pageBlockDetails
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["open","true"]])
		request[i++]=Object.fromEntries([["blocks","Vector<PageBlock>"]])
		request[i++]=Object.fromEntries([["title","RichText"]])
		break
	}
	case 0xb390dc08: {// pageRelatedArticle
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["url","string"]])
		request[i++]=Object.fromEntries([["webpage_id","long"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["description","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["photo_id","long"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["author","string"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["published_date","int"]])
		break
	}
	case 0x16115a96: {// pageBlockRelatedArticles
		request = {[i++]:{title:"RichText"},[i++]:{articles:"Vector<PageRelatedArticle>"}}
		break
	}
	case 0xa44f3ef6: {// pageBlockMap
		request = {[i++]:{geo:"GeoPoint"},[i++]:{zoom:"int"},[i++]:{w:"int"},[i++]:{h:"int"},[i++]:{caption:"PageCaption"}}
		break
	}
	case 0xae891bec: {// page
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["part","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["rtl","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["v2","true"]])
		request[i++]=Object.fromEntries([["url","string"]])
		request[i++]=Object.fromEntries([["blocks","Vector<PageBlock>"]])
		request[i++]=Object.fromEntries([["photos","Vector<Photo>"]])
		request[i++]=Object.fromEntries([["documents","Vector<Document>"]])
		break
	}
	case 0xdb9e70d2: {// inputPrivacyKeyPhoneP2P
		request = {}
		break
	}
	case 0x39491cc8: {// privacyKeyPhoneP2P
		request = {}
		break
	}
	case 0x35553762: {// textAnchor
		request = {[i++]:{text:"RichText"},[i++]:{name:"string"}}
		break
	}
	case 0x8c05f1c9: {// help.supportName
		request = {[i++]:{name:"string"}}
		break
	}
	case 0xf3ae2eed: {// help.userInfoEmpty
		request = {}
		break
	}
	case 0x1eb3758: {// help.userInfo
		request = {[i++]:{message:"string"},[i++]:{entities:"Vector<MessageEntity>"},[i++]:{author:"string"},[i++]:{date:"int"}}
		break
	}
	case 0xf3f25f76: {// messageActionContactSignUp
		request = {}
		break
	}
	case 0xaca1657b: {// updateMessagePoll
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["poll_id","long"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["poll","Poll"]])
		request[i++]=Object.fromEntries([["results","PollResults"]])
		break
	}
	case 0x6ca9c2e9: {// pollAnswer
		request = {[i++]:{text:"string"},[i++]:{option:"bytes"}}
		break
	}
	case 0xd5529d06: {// poll
		request = {[i++]:{id:"long"},[i++]:{flags:"#"},[i++]:{closed:"flags.0?true"},[i++]:{public_voters:"flags.1?true"},[i++]:{multiple_choice:"flags.2?true"},[i++]:{quiz:"flags.3?true"},[i++]:{question:"string"},[i++]:{answers:"Vector<PollAnswer>"}}
		break
	}
	case 0x3b6ddad2: {// pollAnswerVoters
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["chosen","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["correct","true"]])
		request[i++]=Object.fromEntries([["option","bytes"]])
		request[i++]=Object.fromEntries([["voters","int"]])
		break
	}
	case 0x5755785a: {// pollResults
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["min","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["results","Vector<PollAnswerVoters>"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["total_voters","int"]])
		break
	}
	case 0x6b3765b: {// inputMediaPoll
		request = {[i++]:{poll:"Poll"}}
		break
	}
	case 0x4bd6e798: {// messageMediaPoll
		request = {[i++]:{poll:"Poll"},[i++]:{results:"PollResults"}}
		break
	}
	case 0xf041e250: {// chatOnlines
		request = {[i++]:{onlines:"int"}}
		break
	}
	case 0x47a971e0: {// statsURL
		request = {[i++]:{url:"string"}}
		break
	}
	case 0xe0b0bc2e: {// photoStrippedSize
		request = {[i++]:{type:"string"},[i++]:{bytes:"bytes"}}
		break
	}
	case 0x5fb224d5: {// chatAdminRights
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["change_info","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["post_messages","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["edit_messages","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["delete_messages","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["ban_users","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["invite_users","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["pin_messages","true"]])
		if(_flags & (1 << 9)) request[i++]=Object.fromEntries([["add_admins","true"]])
		break
	}
	case 0x9f120418: {// chatBannedRights
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["view_messages","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["send_messages","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["send_media","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["send_stickers","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["send_gifs","true"]])
		if(_flags & (1 << 5)) request[i++]=Object.fromEntries([["send_games","true"]])
		if(_flags & (1 << 6)) request[i++]=Object.fromEntries([["send_inline","true"]])
		if(_flags & (1 << 7)) request[i++]=Object.fromEntries([["embed_links","true"]])
		if(_flags & (1 << 8)) request[i++]=Object.fromEntries([["send_polls","true"]])
		if(_flags & (1 << 10)) request[i++]=Object.fromEntries([["change_info","true"]])
		if(_flags & (1 << 15)) request[i++]=Object.fromEntries([["invite_users","true"]])
		if(_flags & (1 << 17)) request[i++]=Object.fromEntries([["pin_messages","true"]])
		request[i++]=Object.fromEntries([["until_date","int"]])
		break
	}
	case 0x54c01850: {// updateChatDefaultBannedRights
		request = {[i++]:{peer:"Peer"},[i++]:{default_banned_rights:"ChatBannedRights"},[i++]:{version:"int"}}
		break
	}
	case 0xe630b979: {// inputWallPaper
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0x72091c80: {// inputWallPaperSlug
		request = {[i++]:{slug:"string"}}
		break
	}
	case 0xbb6ae88d: {// channelParticipantsContacts
		request = {[i++]:{q:"string"}}
		break
	}
	case 0x2df5fc0a: {// channelAdminLogEventActionDefaultBannedRights
		request = {[i++]:{prev_banned_rights:"ChatBannedRights"},[i++]:{new_banned_rights:"ChatBannedRights"}}
		break
	}
	case 0x8f079643: {// channelAdminLogEventActionStopPoll
		request = {[i++]:{message:"Message"}}
		break
	}
	case 0x1c199183: {// account.wallPapersNotModified
		request = {}
		break
	}
	case 0x702b65a9: {// account.wallPapers
		request = {[i++]:{hash:"int"},[i++]:{wallpapers:"Vector<WallPaper>"}}
		break
	}
	case 0xdebebe83: {// codeSettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["allow_flashcall","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["current_number","true"]])
		if(_flags & (1 << 4)) request[i++]=Object.fromEntries([["allow_app_hash","true"]])
		break
	}
	case 0xa12f40b8: {// wallPaperSettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["blur","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["motion","true"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["background_color","int"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["intensity","int"]])
		break
	}
	case 0xd246fd47: {// autoDownloadSettings
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["disabled","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["video_preload_large","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["audio_preload_next","true"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["phonecalls_less_data","true"]])
		request[i++]=Object.fromEntries([["photo_size_max","int"]])
		request[i++]=Object.fromEntries([["video_size_max","int"]])
		request[i++]=Object.fromEntries([["file_size_max","int"]])
		break
	}
	case 0x63cacf26: {// account.autoDownloadSettings
		request = {[i++]:{low:"AutoDownloadSettings"},[i++]:{medium:"AutoDownloadSettings"},[i++]:{high:"AutoDownloadSettings"}}
		break
	}
	case 0xd5b3b9f9: {// emojiKeyword
		request = {[i++]:{keyword:"string"},[i++]:{emoticons:"Vector<string>"}}
		break
	}
	case 0x236df622: {// emojiKeywordDeleted
		request = {[i++]:{keyword:"string"},[i++]:{emoticons:"Vector<string>"}}
		break
	}
	case 0x5cc761bd: {// emojiKeywordsDifference
		request = {[i++]:{lang_code:"string"},[i++]:{from_version:"int"},[i++]:{version:"int"},[i++]:{keywords:"Vector<EmojiKeyword>"}}
		break
	}
	case 0xa575739d: {// emojiURL
		request = {[i++]:{url:"string"}}
		break
	}
	case 0xb3fb5361: {// emojiLanguage
		request = {[i++]:{lang_code:"string"}}
		break
	}
	case 0xa4dd4c08: {// inputPrivacyKeyForwards
		request = {}
		break
	}
	case 0x69ec56a3: {// privacyKeyForwards
		request = {}
		break
	}
	case 0x5719bacc: {// inputPrivacyKeyProfilePhoto
		request = {}
		break
	}
	case 0x96151fed: {// privacyKeyProfilePhoto
		request = {}
		break
	}
	case 0xbc7fc6cd: {// fileLocationToBeDeprecated
		request = {[i++]:{volume_id:"long"},[i++]:{local_id:"int"}}
		break
	}
	case 0x40181ffe: {// inputPhotoFileLocation
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"},[i++]:{file_reference:"bytes"},[i++]:{thumb_size:"string"}}
		break
	}
	case 0xd83466f3: {// inputPhotoLegacyFileLocation
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"},[i++]:{file_reference:"bytes"},[i++]:{volume_id:"long"},[i++]:{local_id:"int"},[i++]:{secret:"long"}}
		break
	}
	case 0x27d69997: {// inputPeerPhotoFileLocation
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["big","true"]])
		request[i++]=Object.fromEntries([["peer","InputPeer"]])
		request[i++]=Object.fromEntries([["volume_id","long"]])
		request[i++]=Object.fromEntries([["local_id","int"]])
		break
	}
	case 0xdbaeae9: {// inputStickerSetThumb
		request = {[i++]:{stickerset:"InputStickerSet"},[i++]:{volume_id:"long"},[i++]:{local_id:"int"}}
		break
	}
	case 0xff544e65: {// folder
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["autofill_new_broadcasts","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["autofill_public_groups","true"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["autofill_new_correspondents","true"]])
		request[i++]=Object.fromEntries([["id","int"]])
		request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 3)) request[i++]=Object.fromEntries([["photo","ChatPhoto"]])
		break
	}
	case 0x71bd134c: {// dialogFolder
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["pinned","true"]])
		request[i++]=Object.fromEntries([["folder","Folder"]])
		request[i++]=Object.fromEntries([["peer","Peer"]])
		request[i++]=Object.fromEntries([["top_message","int"]])
		request[i++]=Object.fromEntries([["unread_muted_peers_count","int"]])
		request[i++]=Object.fromEntries([["unread_unmuted_peers_count","int"]])
		request[i++]=Object.fromEntries([["unread_muted_messages_count","int"]])
		request[i++]=Object.fromEntries([["unread_unmuted_messages_count","int"]])
		break
	}
	case 0x64600527: {// inputDialogPeerFolder
		request = {[i++]:{folder_id:"int"}}
		break
	}
	case 0x514519e2: {// dialogPeerFolder
		request = {[i++]:{folder_id:"int"}}
		break
	}
	case 0xfbd2c296: {// inputFolderPeer
		request = {[i++]:{peer:"InputPeer"},[i++]:{folder_id:"int"}}
		break
	}
	case 0xe9baa668: {// folderPeer
		request = {[i++]:{peer:"Peer"},[i++]:{folder_id:"int"}}
		break
	}
	case 0x19360dc0: {// updateFolderPeers
		request = {[i++]:{folder_peers:"Vector<FolderPeer>"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
		break
	}
	case 0x2d117597: {// inputUserFromMessage
		request = {[i++]:{peer:"InputPeer"},[i++]:{msg_id:"int"},[i++]:{user_id:"int"}}
		break
	}
	case 0x2a286531: {// inputChannelFromMessage
		request = {[i++]:{peer:"InputPeer"},[i++]:{msg_id:"int"},[i++]:{channel_id:"int"}}
		break
	}
	case 0x17bae2e6: {// inputPeerUserFromMessage
		request = {[i++]:{peer:"InputPeer"},[i++]:{msg_id:"int"},[i++]:{user_id:"int"}}
		break
	}
	case 0x9c95f7bb: {// inputPeerChannelFromMessage
		request = {[i++]:{peer:"InputPeer"},[i++]:{msg_id:"int"},[i++]:{channel_id:"int"}}
		break
	}
	case 0x352dafa: {// inputPrivacyKeyPhoneNumber
		request = {}
		break
	}
	case 0xd19ae46d: {// privacyKeyPhoneNumber
		request = {}
		break
	}
	case 0xa8406ca9: {// topPeerCategoryForwardUsers
		request = {}
		break
	}
	case 0xfbeec0f0: {// topPeerCategoryForwardChats
		request = {}
		break
	}
	case 0xa26f881b: {// channelAdminLogEventActionChangeLinkedChat
		request = {[i++]:{prev_value:"int"},[i++]:{new_value:"int"}}
		break
	}
	case 0xe844ebff: {// messages.searchCounter
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["inexact","true"]])
		request[i++]=Object.fromEntries([["filter","MessagesFilter"]])
		request[i++]=Object.fromEntries([["count","int"]])
		break
	}
	case 0x10b78d29: {// keyboardButtonUrlAuth
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		request[i++]=Object.fromEntries([["text","string"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["fwd_text","string"]])
		request[i++]=Object.fromEntries([["url","string"]])
		request[i++]=Object.fromEntries([["button_id","int"]])
		break
	}
	case 0xd02e7fd4: {// inputKeyboardButtonUrlAuth
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["request_write_access","true"]])
		request[i++]=Object.fromEntries([["text","string"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["fwd_text","string"]])
		request[i++]=Object.fromEntries([["url","string"]])
		request[i++]=Object.fromEntries([["bot","InputUser"]])
		break
	}
	case 0x92d33a0e: {// urlAuthResultRequest
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["request_write_access","true"]])
		request[i++]=Object.fromEntries([["bot","User"]])
		request[i++]=Object.fromEntries([["domain","string"]])
		break
	}
	case 0x8f8c0e4e: {// urlAuthResultAccepted
		request = {[i++]:{url:"string"}}
		break
	}
	case 0xa9d6db1f: {// urlAuthResultDefault
		request = {}
		break
	}
	case 0x4c81c1ba: {// inputPrivacyValueAllowChatParticipants
		request = {[i++]:{chats:"Vector<int>"}}
		break
	}
	case 0xd82363af: {// inputPrivacyValueDisallowChatParticipants
		request = {[i++]:{chats:"Vector<int>"}}
		break
	}
	case 0x18be796b: {// privacyValueAllowChatParticipants
		request = {[i++]:{chats:"Vector<int>"}}
		break
	}
	case 0xacae0690: {// privacyValueDisallowChatParticipants
		request = {[i++]:{chats:"Vector<int>"}}
		break
	}
	case 0x9c4e7e8b: {// messageEntityUnderline
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0xbf0693d4: {// messageEntityStrike
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x20df5d0: {// messageEntityBlockquote
		request = {[i++]:{offset:"int"},[i++]:{length:"int"}}
		break
	}
	case 0x6a7e7366: {// updatePeerSettings
		request = {[i++]:{peer:"Peer"},[i++]:{settings:"PeerSettings"}}
		break
	}
	case 0xbfb5ad8b: {// channelLocationEmpty
		request = {}
		break
	}
	case 0x209b82db: {// channelLocation
		request = {[i++]:{geo_point:"GeoPoint"},[i++]:{address:"string"}}
		break
	}
	case 0xca461b5d: {// peerLocated
		request = {[i++]:{peer:"Peer"},[i++]:{expires:"int"},[i++]:{distance:"int"}}
		break
	}
	case 0xb4afcfb0: {// updatePeerLocated
		request = {[i++]:{peers:"Vector<PeerLocated>"}}
		break
	}
	case 0xe6b76ae: {// channelAdminLogEventActionChangeLocation
		request = {[i++]:{prev_value:"ChannelLocation"},[i++]:{new_value:"ChannelLocation"}}
		break
	}
	case 0xdbd4feed: {// inputReportReasonGeoIrrelevant
		request = {}
		break
	}
	case 0x53909779: {// channelAdminLogEventActionToggleSlowMode
		request = {[i++]:{prev_value:"int"},[i++]:{new_value:"int"}}
		break
	}
	case 0x44747e9a: {// auth.authorizationSignUpRequired
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["terms_of_service","help.TermsOfService"]])
		break
	}
	case 0xd8411139: {// payments.paymentVerificationNeeded
		request = {[i++]:{url:"string"}}
		break
	}
	case 0x28703c8: {// inputStickerSetAnimatedEmoji
		request = {}
		break
	}
	case 0x39a51dfb: {// updateNewScheduledMessage
		request = {[i++]:{message:"Message"}}
		break
	}
	case 0x90866cee: {// updateDeleteScheduledMessages
		request = {[i++]:{peer:"Peer"},[i++]:{messages:"Vector<int>"}}
		break
	}
	case 0xd072acb4: {// restrictionReason
		request = {[i++]:{platform:"string"},[i++]:{reason:"string"},[i++]:{text:"string"}}
		break
	}
	case 0x3c5693e9: {// inputTheme
		request = {[i++]:{id:"long"},[i++]:{access_hash:"long"}}
		break
	}
	case 0xf5890df1: {// inputThemeSlug
		request = {[i++]:{slug:"string"}}
		break
	}
	case 0x483d270c: {// themeDocumentNotModified
		request = {}
		break
	}
	case 0xf7d90ce0: {// theme
		request = {}
		request[i++]=Object.fromEntries([["flags","#"]])
		if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["creator","true"]])
		if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["default","true"]])
		request[i++]=Object.fromEntries([["id","long"]])
		request[i++]=Object.fromEntries([["access_hash","long"]])
		request[i++]=Object.fromEntries([["slug","string"]])
		request[i++]=Object.fromEntries([["title","string"]])
		if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["document","Document"]])
		request[i++]=Object.fromEntries([["installs_count","int"]])
		break
	}
	case 0xf41eb622: {// account.themesNotModified
		request = {}
		break
	}
	case 0x7f676421: {// account.themes
		request = {[i++]:{hash:"int"},[i++]:{themes:"Vector<Theme>"}}
		break
	}
	case 0x8216fba3: {// updateTheme
		request = {[i++]:{theme:"Theme"}}
		break
	}
	case 0xd1219bdd: {// inputPrivacyKeyAddedByPhone
		request = {}
		break
	}
	case 0x42ffd42b: {// privacyKeyAddedByPhone
		request = {}
		break
	}
	case 0x2144ca19:{//RPCerror error:int message:string
		request = {[i++]:{error:"int"},[i++]:{error_text:"string"}}
		break
	}
	case 0x62d6b459:{//msgs_ack#62d6b459 msg_ids:Vector<long> = MsgsAck;
		request = {[i++]:{msg_ids:"Vector<long>"}}
		break
	}
	case 0xa7eff811:{//bad_msg_notification#a7eff811 bad_msg_id:long bad_msg_seqno:int error_code:int = BadMsgNotification;
		request = {[i++]:{bad_msg_id:"long"},[i++]:{bad_msg_seqno:"int"},[i++]:{error_code:"int"}}
		break
	}
	default:{
		request = null
		console.log('Unknown tl_constructor 0x'+tl_constructor.toString(16)+' add it at constructs.js')
		break
	}
	}
	return request
}
