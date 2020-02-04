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
	if( strcmp($constructor_id,"1cb5c415") != 0 ){ 
		echo "\tcase 0x" . $constructor_id . ": {// " . $value->predicate . "\n";
		if(count($value->params) > 0){
			if(strcmp($value->params[0]->name,"flags") == 0){
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
echo "\t\tdefault:{\n";
echo "\t\t\trequest = null\n";
echo "\t\t\tconsole.log('Unknown tl_constructor 0x'+tl_constructor.toString(16)+' add it at constructs.js')\n";
echo "\t\t\tbreak\n";
echo "\t\t}\n";
echo "\t}\n";
echo "\treturn request\n";
echo "}\n";
?>