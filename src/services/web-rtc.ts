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
  console.log(offer);
  return { peerConnection, offer };
}

export async function answerCall(offer : RTCSessionDescriptionInit) {
  const peerConnection = new RTCPeerConnection(config);
  const remoteDesc = new RTCSessionDescription(offer)
  peerConnection.setRemoteDescription(remoteDesc);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  console.log(answer);
}

export async function recognizeAnswer(
  peerConnection : RTCPeerConnection, 
  answer : RTCSessionDescriptionInit
) {
  const remoteDesc = new RTCSessionDescription(answer);
  await peerConnection.setRemoteDescription(remoteDesc);
}