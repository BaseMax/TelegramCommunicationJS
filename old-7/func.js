console.hex = (d) => console.log((Object(d).buffer instanceof ArrayBuffer ? new Uint8Array(d.buffer) : 
typeof d === 'string' ? (new TextEncoder('utf-8')).encode(d) : 
new Uint8ClampedArray(d)).reduce((p, c, i, a) => p + (i % 16 === 0 ? i.toString(16).padStart(6, 0) + '  ' : ' ') + 
c.toString(16).padStart(2, 0) + (i === a.length - 1 || i % 16 === 15 ? 
' '.repeat((15 - i % 16) * 3) + Array.from(a).splice(i - i % 16, 16).reduce((r, v) => 
r + (v > 31 && v < 127 || v > 159 ? String.fromCharCode(v) : '.'), '  ') + '\n' : ''), ''));

	function readUInt32LE (buffer, offset) {offset = offset || 0;return ((buffer[offset]) | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16)) + (buffer[offset + 3] * 0x1000000)}
	function readBigIntFromBuffer(buffer) {var little = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var signed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var randBuffer = Array.from(buffer);var bytesNumber = randBuffer.length;if (little) {randBuffer = randBuffer.reverse();}var res="";for(var i=0; i<randBuffer.length;i++){res = res+(('0' + (randBuffer[i] & 0xFF).toString(16)).slice(-2));}var bigInt = BigInt('0x' + res);if (signed && Math.floor(bigInt.toString('2').length / 8) >= bytesNumber) {bigInt -= bigIntPower(BigInt(2), BigInt(bytesNumber * 8));}return bigInt;}
	function bigIntPower(a, b) {var i;var pow = BigInt(1);for (i = BigInt(0); i < b; i++) {pow = pow * a;}return pow;}
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
		var padding = ((start+length) % 4) ? (4-((start+length) % 4)) : 0
		return value.join('')
	}
    function lengthString(inArray){
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
	function ArrayFromString(str){
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