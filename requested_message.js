//file to send as Array
var testfiledata_array = readArrayFromString("messages.getUnreadMentions 	Get unread messages where we were mentionedmessages.readHistory 	Marks message history as read.messages.readMentions 	Mark mentions as readmessages.readMessageContents 	Notifies the sender about the recipient having listened a voice message or watched a video.messages.receivedMessages 	Confirms receipt of messages by a client, cancels PUSH-notification sending.messages.search 	Gets back found messagesmessages.searchGlobal 	Search for messages and peers globallymessages.sendMedia 	Send a mediamessages.sendMessage 	Sends a message to a chatmessages.sendMultiMedia 	Send an album of mediamessages.updatePinnedMessage 	Pin a messageWorking with notification settingsName 	Descriptionaccount.registerDevice 	Register device to receive PUSH notificationsaccount.unregisterDevice 	Deletes a device by its token, stops sending PUSH-notifications to it.account.updateDeviceLocked 	When client-side passcode lock feature is enabled, will not show message texts in incoming PUSH notifications.account.getNotifyExceptions 	Returns list of chats with non-default notification settingsaccount.getNotifySettings 	Gets current notification settings for a given user/group, from all users/all groups.account.updateNotifySettings 	Edits notification settings from a given user/group, from all users/all groups.account.resetNotifySettings 	Resets all notification settings from users and groups.Working with other usersName 	Descriptionusers.getFullUser 	Returns extended user info by ID.users.getUsers 	Returns basic user info according to their identifiers.Working with paymentsName 	Descriptionpayments.getSavedInfo 	Get saved payment informationpayments.clearSavedInfo 	Clear saved payment informationpayments.getPaymentForm 	Get a payment formpayments.validateRequestedInfo 	Submit requested order information for validationmessages.setBotShippingResults 	If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the bot will receive an updateBotShippingQuery update. Use this method to reply to shipping queries.account.getTmpPassword 	Get temporary payment passwordpayments.sendPaymentForm 	Send compiled payment formmessages.setBotPrecheckoutResults 	Once the user has confirmed their payment and shipping details, the bot receives an updateBotPrecheckoutQuery update.Use this method to respond to such pre-checkout queries.Note: Telegram must receive an answer within 10 seconds after the pre-checkout query was sent.payments.getPaymentReceipt 	Get payment receiptWorking with pollsName 	Descriptionmessages.getPollResults 	Get poll resultsmessages.sendVote 	Vote in a pollWorking with scheduled messagesName 	Descriptionmessages.sendScheduledMessages 	Send scheduled messages right awaymessages.getScheduledHistory 	Get scheduled messagesmessages.deleteScheduledMessages 	Delete scheduled messagesmessages.getScheduledMessages 	Get scheduled messagesWorking with sensitive content (NSFW)Name 	Descriptionaccount.getContentSettings 	Get sensitive content settingsaccount.setContentSettings 	Set sensitive content settings (for viewing or hiding NSFW content)Working with sponsored proxiesName 	Descriptionhelp.getProxyData 	Get promotion info of the currently-used MTProxyWorking with stickersName 	Descriptionstickers.addStickerToSet 	Add a sticker to a stickerset, bots only. The sticker set must have been created by the bot.stickers.changeStickerPosition 	Changes the absolute position of a sticker in the set to which it belongs; for bots only. The sticker set must have been created by the botstickers.createStickerSet 	Create a stickerset, bots only.stickers.removeStickerFromSet 	Remove a sticker from the set where it belongs, bots only. The sticker set must have been created by the bot.messages.clearRecentStickers 	Clear recent stickersmessages.faveSticker 	Mark a sticker as favoritemessages.getAllStickers 	Get all installed stickersmessages.getArchivedStickers 	Get all archived stickersmessages.getAttachedStickers 	Get stickers attached to a photo or videomessages.getFavedStickers 	Get faved stickersmessages.getFeaturedStickers 	Get featured stickersmessages.getMaskStickers 	Get installed mask stickersmessages.getRecentStickers 	Get recent stickersmessages.getStickerSet 	Get info about a stickersetmessages.getStickers 	Get stickers by emojimessages.saveRecentSticker 	Add/remove sticker from recent stickers listmessages.installStickerSet 	Install a stickersetmessages.readFeaturedStickers 	Mark new featured stickers as readmessages.reorderStickerSets 	Reorder installed stickersetsmessages.searchStickerSets 	Search for stickersetsmessages.uninstallStickerSet 	Uninstall a stickersetWorking with the user's accountName 	Descriptionaccount.changePhone 	Change the phone number of the current accountaccount.confirmPhone 	Confirm a phone number to cancel account deletion, for more info click here »account.deleteAccount 	Delete the user's account from the telegram servers. Can be used, for example, to delete the account of a user that provided the login code, but forgot the 2FA password and no recovery method is configured.account.getAccountTTL 	Get days to live of accountaccount.getPrivacy 	Get privacy settings of current accountaccount.resetAuthorization 	Log out an active authorized session by its hashaccount.sendChangePhoneCode 	Verify a new phone number to associate to the current accountaccount.sendConfirmPhoneCode 	Send confirmation code to cancel account deletion, for more info click here »account.setAccountTTL 	Set account self-destruction periodaccount.setPrivacy 	Change privacy settings of current accountaccount.updateProfile 	Updates user profile.account.updateStatus 	Updates online user status.Working with user profile picturesName 	Descriptionphotos.deletePhotos 	Deletes profile photos.photos.getUserPhotos 	Returns the list of user photos.photos.updateProfilePhoto 	Installs a previously uploaded photo as a profile photo.photos.uploadProfilePhoto 	Updates current user profile photo.Working with usernamesName 	Descriptionchannels.checkUsername 	Check if a username is free and can be assigned to a channel/supergroupchannels.updateUsername 	Change the username of a supergroup/channelaccount.updateUsername 	Changes username for the current user.account.checkUsername 	Validates a username and checks availability.contacts.resolveUsername 	Resolve a @username to get peer infoWorking with wallpapersName 	Descriptionaccount.getMultiWallPapers 	Get info about multiple wallpapersaccount.getWallPaper 	Get info about a certain wallpaperaccount.getWallPapers 	Returns a list of available wallpapers.account.installWallPaper 	Install wallpaperaccount.resetWallPapers 	Delete installed wallpapersaccount.saveWallPaper 	Install/uninstall wallpaperaccount.uploadWallPaper 	Create and upload a new wallpaperTelegramTelegram is a cloud-based mobile and desktop messaging app with a focus on security and speed.About    FAQ    Blog    JobsMobile Apps    iPhone/iPad    Android    Windows PhoneDesktop Apps    PC/Mac/Linux    macOS    Web-browserPlatform    API    Translations    Instant View")
var file_length = testfiledata_array.length
var blocks = file_length / 1024
	blocks = blocks - (blocks%1)
var last_block = file_length % 1024
    blocks += (last_block > 0)? 1 : 0
var isfilesended = true
var blockprocessed = 0
var _fileid=133

//test function send ext media
function sendFile(){
	if(isfilesended) {
		isfilesended= false;
		blockprocessed = 0
	}
	if(blockprocessed< blocks && isfilesended == false)	{
		var i = 0
		var buffer = testfiledata_array.slice(blockprocessed*1024,(blockprocessed+1)*1024)
//upload.saveFilePart#b304a621 file_id:long file_part:int bytes:bytes = Bool;		
		tl_request={id:"sendFile",body:{[i++]:{tl_constructor:{uint4:0xb304a621/*de7b673d*/}},
										   [i++]:{file_id:{long:_fileid.toString()}},
										   [i++]:{file_part:{uint4:blockprocessed}},
//										   [i++]:{total_part:{uint4:blocks}},
										   [i++]:{data:{bytes:buffer}}
										}}
		mode = 8
		blockprocessed++
	} else{
		if(!isfilesended){
			var _access_hash=BigInt(userlist.options[userlist.selectedIndex].value)
			var _id=parseInt(userlist.options[userlist.selectedIndex].text,10)
			var i = 0
			var _rndid=1330
//messages.sendMedia#3491eba9 flags:# peer:InputPeer media:InputMedia message:string random_id:long 
			tl_request={id:"sendFile",body:{[i++]:{tl_constructor:{uint4:0x3491eba9}},
											   [i++]:{flags:{uint4:0x0}},
//inputPeerUser#7b8e7de6 user_id:int access_hash:long = InputPeer;											
											   [i++]:{inputPeer:{uint4:0x7b8e7de6}},
											   [i++]:{user_id:{uint4:_id}},
											   [i++]:{access_hash:{long:_access_hash.toString()}},
//inputMediaUploadedDocument#5b38c6c1 flags:# nosound_video:flags.3?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int = InputMedia;
												   [i++]:{inputMediaDocument:{uint4:0x5b38c6c1}},
												   [i++]:{flags:{uint4:0x0}},
//inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;											
													   [i++]:{inputFile:{uint4:0xf52ff27f}},
													   [i++]:{id:{long:_fileid.toString()}},
													   [i++]:{parts:{uint4:blocks}},
													   [i++]:{name:{string:"1.txt"}},
													   [i++]:{md5_checksum:{string:calcMD5(testfiledata_array)}},
												   [i++]:{name:{string:"text/plain"}},
												   [i++]:{attributes:{uint4:0x1cb5c415}},
												   [i++]:{count:{uint4:0x1}},
												   [i++]:{documentAttributeFilename:{uint4:0x15590068}},
												   [i++]:{name:{string:"1.txt"}},
											[i++]:{message:{string:"test uploaded file media message, tlg prototype"}},
											[i++]:{random_id:{long:_rndid.toString()}}
											}}
			mode = 8
			isfilesended = true
		}
	}

}
const _sendFile = function(ob){
	if(!isfilesended){
		if(ob.tl_constructor == 0x997275b5 ) sendFile()
	}else{
		tg_out.innerHTML += "<br><br> == sendFile =="
		tg_out.innerHTML += "<br>" + utf8Decode(JSON.stringify(ob,stringifyReplacer)) + "<br>"
	}
	//todo for test remove
	tg_out.scrollTop = tg_out.scrollHeight;
}
requested_msg["sendFile"]=_sendFile


//test function send ext media
function sendMedia(){
var data_to_send = "i.gifer.com/6D.gif"
//var	_MD5 = BigInt("0x"+calcMD5(readArrayFromString("123")))
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
