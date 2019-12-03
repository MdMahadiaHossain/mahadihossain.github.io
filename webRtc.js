let v = document.getElementById("localVideo");

let promise = navigator.mediaDevices.getUserMedia({ audio: true, video: true });

let pc = new RTCPeerConnection(null);

promise.then(mediaStream => {
  v.srcObject = mediaStream;
  const localStreem = mediaStream;

  // add stream to RTCPeerConnection to send to peer
  localStreem.getTracks().forEach(track => {
    console.log("adding track to RTCPeerConnection for remote peer");
    pc.addTrack(track, localStreem);
  });
});



pc.addEventListener("icecandidate", event => {
  // this candidate will be used in other peer.
  console.log(event.candidate);
});

// create offer
pc.createOffer().then(rTCSessionDescriptionInit => {console.log(rTCSessionDescriptionInit)});
