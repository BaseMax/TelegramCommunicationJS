console.hex = (d) => console.log((Object(d).buffer instanceof ArrayBuffer ? new Uint8Array(d.buffer) : 
typeof d === 'string' ? (new TextEncoder('utf-8')).encode(d) : 
new Uint8ClampedArray(d)).reduce((p, c, i, a) => p + (i % 16 === 0 ? i.toString(16).padStart(6, 0) + '  ' : ' ') + 
c.toString(16).padStart(2, 0) + (i === a.length - 1 || i % 16 === 15 ? 
' '.repeat((15 - i % 16) * 3) + Array.from(a).splice(i - i % 16, 16).reduce((r, v) => 
r + (v > 31 && v < 127 || v > 159 ? String.fromCharCode(v) : '.'), '  ') + '\n' : ''), ''));

	function readString(inArray){
		var value=[]
		var start = 1
		var length = 0
		if(inArray[0] <= 253) {
			length = inArray[0]
		} else {
			length = inArray[1] + (inArray[2]<<8) + (inArray[3]<<16)
			start = 4
		}
		for(var i = 0; i< length; i++){
			value.push(String.fromCharCode(inArray[start+i]))
		}
		return value.join('')
	}
	function readBytes(inArray){
		var value=[]
		var start = 1
		var length = 0
		if(inArray[0] <= 253) {
			length = inArray[0]
		} else {
			length = inArray[1] + (inArray[2]<<8) + (inArray[3]<<16)
			start = 4
		}
		for(var i = 0; i< length; i++){
			value.push(inArray[start+i])
		}
		return value
	}
    function lengthStringOrBytes(inArray){
		var start = 1
		var length = 0
		if(inArray[0] <= 253) {
			length = inArray[0]
		} else {
			length = inArray[1] + (inArray[2]<<8) + (inArray[3]<<16)
			start = 4
		}
		var padding = ((start+length) % 4) ? (4-((start+length) % 4)) : 0
		return start+length+padding
    }
	function readBufferFromString(str){
		const textencoder = new TextEncoder()
		var value = textencoder.encode(str)
		var ret = []
		if(value.length <= 253){
			ret.push(value.length)
		}else{
			ret.push(254)
			ret.push(value.length & 0xff)
			ret.push((value.length >> 8 )& 0xff)
			ret.push((value.length >> 16 )& 0xff)
		}
		for(var i = 0;i<value.length;i++){
			ret.push(value[i])
		}
		var padding = ((ret.length) % 4) ? (4 - ((ret.length) % 4)) : 0
		for(var i = 0; i< padding;i++){
			ret.push(0)
		}
		return ret
	}
	function readArrayFromString(str){
		const textencoder = new TextEncoder()
		var value = textencoder.encode(str)
		var ret = []
		for(var i = 0;i<value.length;i++){
			ret.push(value[i])
		}
		return ret
	}
	function readBufferFromArray(arr){
		var value = arr
		var ret = []
		if(value.length <= 253){
			ret.push(value.length)
		}else{
			ret.push(254)
			ret.push(value.length & 0xff)
			ret.push((value.length >> 8 )& 0xff)
			ret.push((value.length >> 16 )& 0xff)
		}
		for(var i = 0;i<value.length;i++){
			ret.push(value[i])
		}
		var padding = ((ret.length) % 4) ? (4 - ((ret.length) % 4)) : 0
		for(var i = 0; i< padding;i++){
			ret.push(0)
		}
		return ret
	}
	function utf8Decode(utf8String) {
		if (typeof utf8String != 'string') {
			console.hex(utf8String)
			return (typeof utf8String) + " possible mediadata"//throw new TypeError('parameter ‘utf8String’ is not a string');
		}
		// note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
		const unicodeString = utf8String.replace(
			/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
			function(c) {  // (note parentheses for precedence)
				var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
				return String.fromCharCode(cc); }
		).replace(
			/[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
			function(c) {  // (note parentheses for precedence)
				var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
				return String.fromCharCode(cc); }
		);
		return unicodeString;
	}
	function stringifyReplacer(key, value) {
		if (typeof value === 'bigint') {
			return value.toString() + 'n';
		} else {
			return value;
		}
	}
	function parseReplacer(key, value) {
		if (typeof value === 'string') {
			return BigInt(value.slice(0, -1));
		} else {
			return value;
		}
	}
	function r_with_peer(peer){
		var r={}
		switch (peer.type){
			case "broadcast":
			case "channel":{
						r["_id"]=parseInt(peer.id,10)
						r["_access_hash"]=BigInt(peer.access_hash.replace("n",""))
						r["_peer"]=0x20adaef8
				break
			}
			case "user":
			case "bot":{
						r["_id"]=parseInt(peer.id,10)
						r["_access_hash"]=BigInt(peer.access_hash.replace("n",""))
						r["_peer"]=0x7b8e7de6
				break
			}
			case "chat":{
						r["_id"]=parseInt(peer.id,10)
						r["_peer"]=0x179be863
				break
			}
			case "self":{
						r["_peer"]=0x7da07ec9
				break
			}
		}						
		return r
	}
