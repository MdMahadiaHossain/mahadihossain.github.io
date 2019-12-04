let v = document.getElementById("localVideo");
let pv = document.getElementById("peerVideo");

let createOfferButton = document.getElementById("createOffer");
let createOfferAnswer = document.getElementById("createAnswer");

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

pc.addEventListener("icecandidate", event => {
  // this candidate will be used in other peer.
  console.log("icecandidate "+JSON.stringify(event.candidate));
});
pc.addEventListener("iceconnectionstatechange", event => {
  // this candidate will be used in other peer.
  console.log("iceconnectionstatechange "+JSON.stringify(event.candidate));
});

// getting remote streem 
pc.addEventListener("track",(e)=>{
  pv.srcObject=e.streams[0];
})


createOfferButton.addEventListener("click", e => {
  // create offer which is SDP and we will send it to the peer
  pc.createOffer().then(rTCSessionDescriptionInit => {
    console.log(rTCSessionDescriptionInit);
    pc.setLocalDescription(new RTCSessionDescription(rTCSessionDescriptionInit)).then(()=>{Console.log("Offer is set as localDescription")});
  });
});

createOfferAnswer.addEventListener("click", e => {
  // create Answer which is SDP and we will send it to the peer
  pc.createAnswer().then(rTCSessionDescriptionInit => {
    pc.setLocalDescription(new RTCSessionDescription(rTCSessionDescriptionInit)).then(()=>{Console.log("Answer is set as localDescription")});
    console.log(rTCSessionDescriptionInit);
  });
});


setRemoteIceButton.addEventListener("click", e => {
  Console.log(setRemoteIce.value);
  // add peer sent ice
  pc.addIceCandidate(JSON.parse(setRemoteIce.value)).then(r=>{Console.log("ICE is set")})
});



setRemoteOfferButton.addEventListener("click",(e)=>{
 
    console.log(setRemoteOffer.value);
    pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(setRemoteOffer.value))).then((e) => {console.log("Remote offer/answer set")})

})





