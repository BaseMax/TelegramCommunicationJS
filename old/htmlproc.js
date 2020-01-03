
onmessage = function(e) {
  if(e.data[0] == 'set'){
     postMessage('parsed data '+e.data[1]);
  }
}