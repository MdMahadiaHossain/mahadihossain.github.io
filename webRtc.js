
let v = document.getElementById("localVideo");

let mediaStream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});

v.srcObject = mediaStream