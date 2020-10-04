const config : RTCConfiguration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
};

const options : RTCOfferOptions = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};

export async function makeCall(localStream : MediaStream) {
  const peerConnection = new RTCPeerConnection(config);
  localStream.getTracks().forEach(track => {
    console.log('adding track to peer connection', track);
    peerConnection.addTrack(track, localStream);
  });
  const offer = await peerConnection.createOffer(options);
  await peerConnection.setLocalDescription(offer);
  return { peerConnection, offer };
}

export async function answerCall(remoteStream : MediaStream, sdp : string) {
  const peerConnection = new RTCPeerConnection(config);
  peerConnection.addEventListener('track', (event) => {
    console.log('track found', event.track)
    remoteStream.addTrack(event.track);
  });
  const remoteDesc = new RTCSessionDescription({
    type: 'offer',
    sdp
  });
  peerConnection.setRemoteDescription(remoteDesc);
  const answer = await peerConnection.createAnswer(options);
  await peerConnection.setLocalDescription(answer);
  return { peerConnection, answer };
}

export async function recognizeAnswer(
  peerConnection : RTCPeerConnection, 
  answer : RTCSessionDescriptionInit
) {
  const remoteDesc = new RTCSessionDescription(answer);
  await peerConnection.setRemoteDescription(remoteDesc);
}