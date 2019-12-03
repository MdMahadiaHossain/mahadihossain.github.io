let v = document.getElementById("localVideo");
let createOfferButton = document.getElementById("createOffer");
let createOfferAnswer = document.getElementById("createAnswer");
let createCanditate = document.getElementById("createCanditate");
let setRemoteOffer = document.getElementById("setRemoteOffer");
let setRemoteAnswer = document.getElementById("setRemoteAnswer");
let setRemoteIce = document.getElementById("setRemoteIce");


let setRemoteOfferButton = document.getElementById("setRemoteOfferButton");
let setRemoteAnswerButton = document.getElementById("setRemoteAnswerButton");
let setRemoteIceButton = document.getElementById("setRemoteIceButton");



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

createCanditate.addEventListener("click", e => {
  pc.addEventListener("icecandidate", event => {
    // this candidate will be used in other peer.
    console.log(event.candidate);
  });
});


let offer;
createOfferButton.addEventListener("click", e => {
  // create offer which is SDP and we will send it to the peer
  pc.createOffer().then(rTCSessionDescriptionInit => {
    console.log(rTCSessionDescriptionInit);
    offer = rTCSessionDescriptionInit;
  });
});

createOfferAnswer.addEventListener("click", e => {
  // create Answer which is SDP and we will send it to the peer
  pc.createAnswer().then(rTCSessionDescriptionInit => {
    console.log(rTCSessionDescriptionInit);
  });
});



setRemoteOfferButton.addEventListener("click",(e)=>{
 
     pc.localDescription(offer);
     pc.setRemoteDescription(JSON.parse(setRemoteOffer.value));

})
