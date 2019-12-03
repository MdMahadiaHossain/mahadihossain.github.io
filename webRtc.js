let v = document.getElementById("localVideo");
let localStreem;

let mediaStream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true
});

v.srcObject = mediaStream;
localStreem = mediaStream;

let pc = new RTCPeerConnection(null);

pc.addEventListener("icecandidate", event => {
  // this candidate will be used in other peer.
  console.log(event.candidate);
});

// add stream to RTCPeerConnection to send to peer
localStreem.getTracks().forEach((track)=> {
    pc.addTrack(track,localStreem);
});

// create offer
