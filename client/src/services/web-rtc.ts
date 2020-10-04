const config : RTCConfiguration = {
  iceServers: [
    {
      urls: 'stun:localhost:3100'
    }
  ]
};

export async function makeCall() {
  const peerConnection = new RTCPeerConnection(config);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log(encodeURI(`http://localhost:3000/answer/${offer.sdp}`));
  return { peerConnection, offer };
}

export async function answerCall(sdp : string) {
  const peerConnection = new RTCPeerConnection(config);
  const remoteDesc = new RTCSessionDescription({
    type: 'offer',
    sdp
  })
  peerConnection.setRemoteDescription(remoteDesc);
  const answer = await peerConnection.createAnswer();
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