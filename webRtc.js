
let v = document.getElementById("localVideo");

let promise =  navigator.mediaDevices.getUserMedia({audio:true,video:true});

promise.then(mediaStream =>{v.srcObject=mediaStream; });