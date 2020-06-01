function getrequest(tl_constructor,_flags){
	var request = {}
	switch (tl_constructor){
		case 0x8e1a1775:{ //nearestDc#8e1a1775 country:string this_dc:int nearest_dc:int = NearestDc;
			request = {counrty:"string",this_dc:"uint4",nearest_dc:"uint4"}
			break
		}
		case 0x2215bcbd:{//auth.sentCode#2215bcbd phone_registered:Bool phone_code_hash:string = auth.SentCode;
			request = {phone_registered:"bool",phone_code_hash:"string"}
			break
		}
		case 0x5e002502:{// flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
			request={flags:"uint4",auth:"SentCodeType",phone_code_hash:"string"}
			if(_flags & (1 << 1)) request.next_type="uint4"
			if(_flags & (1 << 2)) request.timeout="uint4"
			break
		}
		case 0xab03c6d9:{
			request={pattern:"string"}
			break
		}
		case 0x3dbb5986:{
			request={length:"uint4"}
			break
		}
		case 0xcd050916:{// flags:# tmp_sessions:flags.0?int user:User
			request={flags:"uint4"}
			if(_flags & (1 << 0)) request.tmp_sessions="uint4"
			request.user="User"
			break
		}
		case 0x2144ca19:{//RPCerror error:int message:string
			request = {error:"uint4",error_text:"string"}
			break
		}
		case 0x938458c1:{// flags:# self:flags.10?true contact:flags.11?true mutual_contact:flags.12?true deleted:flags.13?true bot:flags.14?true bot_chat_history:flags.15?true bot_nochats:flags.16?true verified:flags.17?true restricted:flags.18?true min:flags.20?true bot_inline_geo:flags.21?true support:flags.23?true scam:flags.24?true id:int access_hash:flags.0?long first_name:flags.1?string last_name:flags.2?string username:flags.3?string phone:flags.4?string photo:flags.5?UserProfilePhoto status:flags.6?UserStatus bot_info_version:flags.14?int restriction_reason:flags.18?Vector<RestrictionReason> bot_inline_placeholder:flags.19?string lang_code:flags.22?string = User;
			request={flags:"uint4"}
			if(_flags & (1 << 10)) request.self="true"
			if(_flags & (1 << 11)) request.contact="true"
			if(_flags & (1 << 12)) request.mutual_contact="true"
			if(_flags & (1 << 13)) request.deleted="true"
			if(_flags & (1 << 14)) request.bot="true"
			if(_flags & (1 << 15)) request.bot_chat_history="true"
			if(_flags & (1 << 16)) request.bot_nochats="true"
			if(_flags & (1 << 17)) request.verified="true"
			if(_flags & (1 << 18)) request.restricted="true"
			if(_flags & (1 << 20)) request.min="true"
			if(_flags & (1 << 21)) request.bot_inline_geo="true"
			if(_flags & (1 << 23)) request.support="true"
			if(_flags & (1 << 24)) request.scam="true"
			request.id="uint4"
			if(_flags & (1 << 0)) request.access_hash="long"
			if(_flags & (1 << 1)) request.first_name="string"
			if(_flags & (1 << 2)) request.last_name="string"
			if(_flags & (1 << 3)) request.username="string"
			if(_flags & (1 << 4)) request.phone="string"
			if(_flags & (1 << 5)) request.photo="UserProfilePhoto"
			if(_flags & (1 << 6)) request.status="UserStatus"
			if(_flags & (1 << 14)) request.bot_info_version="uint4"
			if(_flags & (1 << 18)) request.restriction_reason="Vector<RestrictionReason>"
			if(_flags & (1 << 19)) request.bot_inline_placeholder="string"
			if(_flags & (1 << 22)) request.lang_code="string"
			break	
		}
		case 0xecd75d8c:{// photo_id:long photo_small:FileLocation photo_big:FileLocation dc_id:int = UserProfilePhoto
			request={ photo_id:"long", photo_small:"FileLocation", photo_big:"FileLocation", dc_id:"uint4"}
			break
		}
		case 0xbc7fc6cd: {// volume_id:long local_id:int = FileLocation;
			request={ volume_id:"long", local_id:"uint4"}
			break
		}
		case 0x8c703f :{//userStatusOffline#8c703f was_online:int = UserStatus;
			request={ was_online:"uint4"}
			break
		}
		default:{
			request = {}
			console.log('Unknown tl_constructor 0x'+tl_constructor.toString(16)+' add it at constructs.js')
			break
		}
	}
	return request
}