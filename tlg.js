const myp0 = document.getElementById('htmlresult')
const myp1 = document.getElementById('mtprotoresult')
const myp2 = document.getElementById('serverresult')


const mainloopdelay = 10
var mainlooptimer = null
var htmlproc = null
var htmlready = true
var mtprotoproc = null
var mode = 0 //start
var status = 0 //none


var testcounter0= 0
var testcounter1= 0

function mainloop(){
	console.log("mainloop event")
	switch (mode){
		case 0: {
			    mtprotoproc.postMessage(['connect',testcounter1])
			    testcounter1++
			    mode = 1 //wait connect
			    break
		}
		case 2:{
			    mtprotoproc.postMessage(['login',testcounter1])
			    testcounter1++
				mode = 3
				break
		}
		case 4:{
			    if(Math.random()*10 > 9.9){
					myp2.innerHTML = "data to server " + testcounter1
				    mtprotoproc.postMessage(['data',testcounter1])
				    testcounter1++
				}
		}
	}
	start()
}

function start(){
	mainlooptimer = setTimeout(mainloop, mainloopdelay)
}


if(window.Worker) {
	
	htmlproc = new Worker("htmlproc.js");
	htmlproc.onmessage = get_htmlprocdata

	mtprotoproc = new Worker("mtprotoproc.js")
	mtprotoproc.onmessage = get_mtprotoprocdata
	
	
start()
	
}else{
	console.log('Your browser doesn\'t support web workers.')
}


function get_htmlprocdata(e){
	myp0.innerHTML = e.data
	htmlready = true
}

function get_mtprotoprocdata(e){
	switch (e.data[0]){
		case 1:{
				myp1.innerHTML = "connected to server"
				mode = 2 //connected
				break
				}
		case 2:{
				myp1.innerHTML += " logined"
				mode = 4 //logined
				break
				}
		case 3:{
				htmlproc.postMessage(['set',' >>data to parse '+ e.data[1] +" " +testcounter0])
				htmlready = false
				testcounter0++
				break
				}
	}
}