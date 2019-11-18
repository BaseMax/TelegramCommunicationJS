function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

onmessage = function(e) {
  if(e.data[0] == 'set'){
     postMessage('parsed data '+e.data[1]);
  }
}