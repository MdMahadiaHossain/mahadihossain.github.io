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

let getter = document.getElementById("getter");
let ice = document.getElementById("ice");



let promise = navigator.mediaDevices.getUserMedia({ audio: true, video: true });
const constraints = {audio: true, video: true};
const configuration = {'iceServers': [{ 'urls': ['stun.l.google.com:19302',
'stun1.l.google.com:19302',
'stun2.l.google.com:19302',
'stun3.l.google.com:19302',
'stun4.l.google.com:19302',
'stun01.sipphone.com',
'stun.ekiga.net',
'stun.fwdnet.net',
'stun.ideasip.com',
'stun.iptel.org',
'stun.rixtelecom.se',
'stun.schlund.de'] }]};

let pc = new RTCPeerConnection(configuration);

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
  ice.value=JSON.stringify(event.candidate);
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
    getter.value=JSON.stringify(rTCSessionDescriptionInit);
    pc.setLocalDescription(new RTCSessionDescription(rTCSessionDescriptionInit)).then(()=>{console.log("Offer is set as localDescription")});
  });
});

createOfferAnswer.addEventListener("click", e => {
  // create Answer which is SDP and we will send it to the peer
  pc.createAnswer().then(rTCSessionDescriptionInit => {
    getter.value=JSON.stringify(rTCSessionDescriptionInit);
    pc.setLocalDescription(new RTCSessionDescription(rTCSessionDescriptionInit)).then(()=>{console.log("Answer is set as localDescription")});
    console.log(rTCSessionDescriptionInit);
  });
});


setRemoteIceButton.addEventListener("click", e => {
  console.log(setRemoteIce.value);
  // add peer sent ice
  pc.addIceCandidate(JSON.parse(setRemoteIce.value)).then(r=>{console.log("ICE is set")})
});



setRemoteOfferButton.addEventListener("click",(e)=>{
 
    console.log(setRemoteOffer.value);
    pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(setRemoteOffer.value))).then((e) => {console.log("Remote offer/answer set")})

})





