<?php 
//**************************************************************************
//  automatic parser json telegram constructor. reads from the official site.
//  ussage:
//  php get_constructs.php > constructs.js 
//
//  !! replace old file without warning
//**************************************************************************
$jsonData = json_decode(file_get_contents('https://core.telegram.org/schema/json'));
echo "function getrequest(tl_constructor,_flags,vector_type){\n";
echo "\tvar request = null\n";
echo "\tvar i = 0\n";
echo "\tswitch (tl_constructor){\n";
foreach($jsonData->constructors as $key=>$value){
	$constructor_id = dechex($value->id);
	$constructor_id = substr($constructor_id,-8);
	if(( strcmp($constructor_id,"d5529d06") == 0 )|( strcmp($constructor_id,"a437c3ed") == 0 )){ 
	} else {
		if( strcmp($constructor_id,"1cb5c415") != 0 ){ 
			echo "\tcase 0x" . $constructor_id . ": {// " . $value->predicate . "\n";
			if(count($value->params) > 0){
				if(strcmp($value->params[0]->name,"flags") == 0){// constructor flags unique parsing
					echo "\t\trequest = {}\n";
					for($i = 0; $i<count($value->params);$i++){
						if(strpos($value->params[$i]->type,"flags") !== false){
							preg_match('/flags\.([\d]*?)\?(.*)/',$value->params[$i]->type,$flag);
							echo "\t\tif(_flags & (1 << ".$flag[1].")) request[i++]=Object.fromEntries([[\"".$value->params[$i]->name."\",\"".$flag[2]."\"]])\n";
						} else {
							echo "\t\trequest[i++]=Object.fromEntries([[\"".$value->params[$i]->name."\",\"".$value->params[$i]->type."\"]])\n";
						}
					}
				} else {
					$out = "\t\trequest = {";
					for($i = 0; $i<count($value->params);$i++){
						$out .= "[i++]:{".$value->params[$i]->name . ":\"". $value->params[$i]->type . "\"},";
					}
					$out = rtrim($out,',');
					$out .= "}\n";
					echo $out;
				}
			} else {
				echo "\t\trequest = {}\n";
			}
			echo "\t\tbreak\n";
			echo "\t}\n";
		} else {
			echo "\tcase 0x1cb5c415: { //vector\n";
			echo "\t\trequest = {[i++]:{\"0\":\"uint4\"}}\n";
			echo "\t\tfor( i; i<=_flags; i++){\n";
			echo "\t\t\trequest[i] = Object.fromEntries([[i,vector_type]])\n";
			echo "\t\t}\n";
			echo "\t\tbreak\n";
			echo "\t}\n";
		}
	}
}
//possible bugs constructors??
echo "\n//\tnot standart constructors\n\n";
echo "\tcase 0xd5529d06: {// poll\n";
echo "\t\trequest = {}\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"id\",\"long\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"flags\",\"#\"]])\n";
echo "\t\tif(_flags & (1 << 0)) request[i++]=Object.fromEntries([[\"closed\",\"true\"]])\n";
echo "\t\tif(_flags & (1 << 1)) request[i++]=Object.fromEntries([[\"public_voters\",\"true\"]])\n";
echo "\t\tif(_flags & (1 << 2)) request[i++]=Object.fromEntries([[\"multiple_choice\",\"true\"]])\n";
echo "\t\tif(_flags & (1 << 3)) request[i++]=Object.fromEntries([[\"quiz","true\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"question\",\"string\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"answers\",\"Vector<PollAnswer>\"]])\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\tcase 0xa437c3ed: {// wallPaper\n";
echo "\t\trequest = {}\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"id\",\"long\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"flags\",\"#\"]])\n";
echo "\t\tif(_flags & (1 << 0)) request[i++]=Object.fromEntries([[\"creator\",\"true\"]])\n";
echo "\t\tif(_flags & (1 << 1)) request[i++]=Object.fromEntries([[\"default\",\"true\"]])\n";
echo "\t\tif(_flags & (1 << 3)) request[i++]=Object.fromEntries([[\"pattern\",\"true\"]])\n";
echo "\t\tif(_flags & (1 << 4)) request[i++]=Object.fromEntries([[\"dark\",\"true\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"access_hash\",\"long\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"slug\",\"string\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"document\",\"Document\"]])\n";
echo "\t\tif(_flags & (1 << 2)) request[i++]=Object.fromEntries([[\"settings\",\"WallPaperSettings\"]])\n";
echo "\t\tbreak\n";
echo "\t}\n";

//constructors not included in https://core.telegram.org/schema/json
echo "\n//\tmanual added constructors\n\n";
echo "\tcase 0xf35c6d01:{//rpc_result#f35c6d01 req_msg_id:long result:Object = RpcResult;\n";
echo "\t\trequest = {}\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"req_msg_id\",\"long\"]])\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\tcase 0xfa64e172:{//webPage#fa64e172 flags:# id:long url:string display_url:string hash:int type:flags.0?string site_name:flags.1?string title:flags.2?string description:flags.3?string photo:flags.4?Photo embed_url:flags.5?string embed_type:flags.5?string embed_width:flags.6?int embed_height:flags.6?int duration:flags.7?int author:flags.8?string document:flags.9?Document documents:flags.11?Vector<Document> cached_page:flags.10?Page = WebPage;\n";
echo "\t\trequest = {}\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"flags\",\"#\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"id\",\"long\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"url\",\"string\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"display_url\",\"string\"]])\n";
echo "\t\trequest[i++]=Object.fromEntries([[\"hash\",\"int\"]])\n";
echo "\t\tif(_flags & (1 << 0)) request[i++]=Object.fromEntries([[\"type\",\"string\"]])\n";
echo "\t\tif(_flags & (1 << 1)) request[i++]=Object.fromEntries([[\"site_name\",\"string\"]])\n";
echo "\t\tif(_flags & (1 << 2)) request[i++]=Object.fromEntries([[\"title\",\"string\"]])\n";
echo "\t\tif(_flags & (1 << 3)) request[i++]=Object.fromEntries([[\"description\",\"string\"]])\n";
echo "\t\tif(_flags & (1 << 4)) request[i++]=Object.fromEntries([[\"photo\",\"Photo\"]])\n";
echo "\t\tif(_flags & (1 << 5)) request[i++]=Object.fromEntries([[\"embed_url\",\"string\"]])\n";
echo "\t\tif(_flags & (1 << 5)) request[i++]=Object.fromEntries([[\"embed_type\",\"string\"]])\n";
echo "\t\tif(_flags & (1 << 6)) request[i++]=Object.fromEntries([[\"embed_width\",\"int\"]])\n";
echo "\t\tif(_flags & (1 << 6)) request[i++]=Object.fromEntries([[\"embed_heigth\",\"int\"]])\n";
echo "\t\tif(_flags & (1 << 7)) request[i++]=Object.fromEntries([[\"duration\",\"int\"]])\n";
echo "\t\tif(_flags & (1 << 8)) request[i++]=Object.fromEntries([[\"author\",\"string\"]])\n";
echo "\t\tif(_flags & (1 << 9)) request[i++]=Object.fromEntries([[\"document\",\"Document\"]])\n";
echo "\t\tif(_flags & (1 << 11)) request[i++]=Object.fromEntries([[\"documents\",\"Vector<Document>\"]])\n";
echo "\t\tif(_flags & (1 << 10)) request[i++]=Object.fromEntries([[\"cahet_page\",\"Page\"]])\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\tcase 0x2144ca19:{//RPCerror error:int message:string\n";
echo "\t\trequest = {[i++]:{error:\"int\"},[i++]:{error_text:\"string\"}}\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\tcase 0x62d6b459:{//msgs_ack#62d6b459 msg_ids:Vector<long> = MsgsAck\n";
echo "\t\trequest = {[i++]:{msg_ids:\"Vector<long>\"}}\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\tcase 0xa7eff811:{//bad_msg_notification#a7eff811 bad_msg_id:long bad_msg_seqno:int error_code:int = BadMsgNotification\n";
echo "\t\trequest = {[i++]:{bad_msg_id:\"long\"},[i++]:{bad_msg_seqno:\"int\"},[i++]:{error_code:\"int\"}}\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\tcase 0x347773c5:{//pong#347773c5 msg_id:long ping_id:long = Pong\n";
echo "\t\trequest = {[i++]:{msg_id:\"long\"},[i++]:{ping_id:\"long\"}}\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\tdefault:{\n";
echo "\t\trequest = null\n";
echo "\t\tconsole.log('Unknown tl_constructor 0x'+tl_constructor.toString(16)+' add it at constructs.js')\n";
echo "\t\tbreak\n";
echo "\t}\n";
echo "\t}\n";
echo "\treturn request\n";
echo "}\n";
?>