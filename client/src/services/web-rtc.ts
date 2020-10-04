import { publish, subscribe } from "./signal";

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

  //add stream tracks
  localStream.getTracks().forEach(track => {
    console.log('adding track to peer connection', track);
    peerConnection.addTrack(track, localStream);
  });

  //make the offer
  const offer = await peerConnection.createOffer(options);
  await peerConnection.setLocalDescription(offer);
  publish({
    type: 'offer',
    payload: {
      sdp: offer.sdp!
    }
  });

  //listen for the callee's answer
  subscribe(async (message) => {
    if (message.type === 'answer') {
      const { sdp } = message.payload;
      const remoteDesc = new RTCSessionDescription({
        type: 'answer',
        sdp: sdp
      });
      console.log('received answer', remoteDesc);
      await peerConnection.setRemoteDescription(remoteDesc);
      console.log('caller accepted answer');
    }
  });

  //exchange ice candidates
  peerConnection.addEventListener('icecandidate', event => {
    if (!event.candidate) return;
    // console.log('caller trickling ice candidate', event.candidate)
    publish({
      type: 'caller-ice-candidate',
      payload: {
        candidate: event.candidate
      }
    });
  });
  subscribe(async (message) => {
    if (message.type === 'answerer-ice-candidate') {
      const { candidate } = message.payload;
      await peerConnection.addIceCandidate(candidate!);
      // console.log('caller added ice candidate', candidate);
    }
  });

  //notify console that connection was successful
  peerConnection.addEventListener('connectionstatechange', () => {
    if (peerConnection.connectionState === 'connected') {
      console.log('caller connected');
    }
  });
}

export async function answerCall(remoteStream : MediaStream) {
  const peerConnection = new RTCPeerConnection(config);

  //when tracks are added, add them to the remote stream
  peerConnection.addEventListener('track', (event) => {
    console.log('track found', event.track)
    remoteStream.addTrack(event.track);
  });

  subscribe(async (message) => {
    //when an offer is made, send an answer
    if (message.type === 'offer') {
      const { sdp } = message.payload;
      const remoteDesc = new RTCSessionDescription({
        type: 'offer',
        sdp
      });
      console.log('answering', remoteDesc);
      peerConnection.setRemoteDescription(remoteDesc);
      const answer = await peerConnection.createAnswer(options);
      await peerConnection.setLocalDescription(answer);
      console.log('answered call:', answer);
      publish({
        type: 'answer',
        payload: {
          sdp: answer.sdp!
        }
      });
    }
  });

  //exchange ice-candidates
  peerConnection.addEventListener('icecandidate', event => {
    if (!event.candidate) return;
    // console.log('answerer trickling ice candidate', event.candidate)
    publish({
      type: 'answerer-ice-candidate',
      payload: {
        candidate: event.candidate
      }
    });
  });
  subscribe(async (message) => {
    if (message.type === 'caller-ice-candidate') {
      const { candidate } = message.payload;
      await peerConnection.addIceCandidate(candidate!);
      // console.log('answerer added ice candidate', candidate);
    }
  });
  peerConnection.addEventListener('connectionstatechange', () => {
    if (peerConnection.connectionState === 'connected') {
      console.log('answerer connected');
    }
  });
}