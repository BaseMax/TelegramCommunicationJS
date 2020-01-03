//temporary immitator of work
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}


onmessage = function(e) {
  switch (e.data[0]){
	case 'connect': {
	 					//long delay
     					wait(500)
     					postMessage([1,""])
						break
	  				}
	case 'login':	{
     					wait(1000)
     					postMessage([2,""])
						break
	}
	case 'data':	{
					    if(Math.random()*10 > 9.5){
							postMessage([3,"Server answer "+ e.data[1]])
						}
						break
	}
  }
}