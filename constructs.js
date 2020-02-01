function getrequest(tl_constructor,_flags){
	var request = null
	var i = 0
	switch (tl_constructor){
		case 0x8e1a1775:{ //nearestDc#8e1a1775 country:string this_dc:int nearest_dc:int = NearestDc;
			request = {[i++]:{counrty:"string"},[i++]:{this_dc:"int"},[i++]:{nearest_dc:"int"}}
			break
		}
		case 0x2215bcbd:{//auth.sentCode#2215bcbd phone_registered:Bool phone_code_hash:string = auth.SentCode;
			request = {[i++]:{phone_registered:"bool"},[i++]:{phone_code_hash:"string"}}
			break
		}
		case 0x5e002502:{// flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
			request = {[i++]:{flags:"uint4"},[i++]:{auth:"SentCodeType"},[i++]:{phone_code_hash:"string"}}
			if(_flags & (1 << 1)) request[i++]=Object.fromEntries([["next_type","uint4"]])
			if(_flags & (1 << 2)) request[i++]=Object.fromEntries([["timeout","uint4"]])
			break
		}
		case 0xab03c6d9:{
			request = {[i++]:{pattern:"string"}}
			break
		}
		case 0x3dbb5986:{
			request = {[i++]:{length:"uint4"}}
			break
		}
		case 0xcd050916:{// flags:# tmp_sessions:flags.0?int user:User
			request = {[i++]:{flags:"uint4"}}
			if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["tmp_sessions","uint4"]])
			request[i++]=Object.fromEntries([["user","User"]])
			break
		}
		case 0x2144ca19:{//RPCerror error:int message:string
			request = {[i++]:{error:"int"},[i++]:{error_text:"string"}}
			break
		}
		case 0x938458c1:{// flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true id:int access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string = User;
			request = {[i++]:{flags:"uint4"}}
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
			if(_flags & (1 << 14)) request[i++]=Object.fromEntries([["bot_info_version","uint4"]])
			if(_flags & (1 << 18)) request[i++]=Object.fromEntries([["restriction_reason","Vector<RestrictionReason>"]])
			if(_flags & (1 << 19)) request[i++]=Object.fromEntries([["bot_inline_placeholder","string"]])
			if(_flags & (1 << 22)) request[i++]=Object.fromEntries([["lang_code","string"]])
			break	
		}
		case 0xecd75d8c:{// photo_id:long photo_small:FileLocation photo_big:FileLocation dc_id:int = UserProfilePhoto
			request = {[i++]:{photo_id:"long"}, [i++]:{photo_small:"FileLocation"}, [i++]:{photo_big:"FileLocation"}, [i++]:{dc_id:"int"}}
			break
		}
		case 0xbc7fc6cd: {// volume_id:long local_id:int = FileLocation;
			request = {[i++]:{volume_id:"long"}, [i++]:{local_id:"uint4"}}
			break
		}
		case 0x8c703f :{//userStatusOffline#8c703f was_online:int = UserStatus;
			request = {[i++]:{was_online:"int"}}
			break
		}
		case 0x1cb5c415:{ //vector
			request = {[i++]:{"0":"uint4"}}
			for( i; i<=_flags; i++){
				request[i] = Object.fromEntries([[i,"vectordata"]])
			}
			break
		}
		case 0xd3680c61:{ //d3680c61 user_id:int status:UserStatus = ContactStatus;
			request = {[i++]:{user_id:"int"}, [i++]:{status:"UserStatus"}}
			break
		}
		case 0x74ae4240:{//updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
			request = {[i++]:{updates:"Vector<Update>"}, [i++]:{users:"Vector<User>"}, [i++]:{chats:"Vector<Chat>"}, [i++]:{date:"int"}, [i++]:{seq:"int"}}
			break
		}
		case 0x62ba04d9 :{//updateNewChannelMessage#62ba04d9 message:Message pts:int pts_count:int = Update;
			request = {[i++]:{message:"Message"}, [i++]:{pts:"int"}, [i++]:{pts_count:"int"}}
			break
		}
		case 0x78d4dec1:{//updateShort#78d4dec1 update:Update date:int = Updates;
			request = {[i++]:{update:"Update"}, [i++]:{date:"int"}}
			break
		}
		case 0x1bfbd823:{//updateUserStatus#1bfbd823 user_id:int status:UserStatus = Update;
			request = {[i++]:{user_id:"int"}, [i++]:{status:"UserStatus"}}
			break
		}
		case 0xedb93949:{//userStatusOnline#edb93949 expires:int = UserStatus;
			request = {[i++]:{expires:"int"}}
			break
		}
		case 0x9d05049:{//userStatusEmpty#9d05049 = UserStatus;
			request = {}
			break
		}
		case 0xf6b673a4:{//auth.authorization#f6b673a4 expires:int user:User = auth.Authorization;
			request = {[i++]:{expires:"int"}, [i++]:{user:"User"}}
			break
		}
		case 0x9e19a1f6:{//messageService#9e19a1f6 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?int to_id:Peer reply_to_msg_id:flags.3?int date:int action:MessageAction = Message;
			request = {[i++]:{flags:"uint4"}}
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
		case 0xbddde532:{//peerChannel#bddde532 channel_id:int = Peer;
			request = {[i++]:{channel_id:"int"}}
			break
		}
		case 0x488a7337:{//messageActionChatAddUser#488a7337 users:Vector<int> = MessageAction;
			request = {[i++]:{users:"Vector<int>"}}
			break
		}
		case 0xc37521c9:{//updateDeleteChannelMessages#c37521c9 channel_id:int messages:Vector<int> pts:int pts_count:int = Update;
			request = {[i++]:{channel_id:"int"}, [i++]:{messages:"Vector<int>"},[i++]:{pts:"int"}, [i++]:{pts_count:"int"}}
			break
		}
		case 0x1f2b0afd:{//updateNewMessage#1f2b0afd message:Message pts:int pts_count:int = Update;
			request = {[i++]:{message:"Message"}, [i++]:{pts:"int"}, [i++]:{pts_count:"int"}}
			break
		}
		case 0x452c0e65:{//message#452c0e65 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true post:flags.14?true from_scheduled:flags.18?true legacy:flags.19?true edit_hide:flags.21?true id:int from_id:flags.8?int to_id:Peer fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?int reply_to_msg_id:flags.3?int date:int message:string media:flags.9?MessageMedia reply_markup:flags.6?ReplyMarkup entities:flags.7?Vector<MessageEntity> views:flags.10?int edit_date:flags.15?int post_author:flags.16?string grouped_id:flags.17?long restriction_reason:flags.22?Vector<RestrictionReason> = Message;
			request = {[i++]:{flags:"uint4"}}
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
		case 0x9db1bc6d:{//peerUser#9db1bc6d user_id:int = Peer;
			request = {[i++]:{user_id:"int"}}
			break
		}
		case 0x2f2f21bf:{//updateReadHistoryOutbox#2f2f21bf peer:Peer max_id:int pts:int pts_count:int = Update;
			request = {[i++]:{peer:"Peer"},[i++]:{max_id:"int"},[i++]:{pts:"int"},[i++]:{pts_count:"int"}}
			break
		}
		case 0x330b5424:{//updateReadChannelInbox#330b5424 flags:# folder_id:flags.0?int channel_id:int max_id:int still_unread_count:int pts:int = Update;
			request = {[i++]:{flags:"uint4"}}
			if(_flags & (1 << 0)) request[i++]=Object.fromEntries([["folder_id","int"]])
			request[i++]=Object.fromEntries([["channel_id","int"]])
			request[i++]=Object.fromEntries([["max_id","int"]])
			request[i++]=Object.fromEntries([["still_unread_count","int"]])
			request[i++]=Object.fromEntries([["pts","int"]])
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