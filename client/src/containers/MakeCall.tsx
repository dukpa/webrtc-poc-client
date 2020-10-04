import React, { useEffect, useState } from 'react';
import { publish, subscribe } from '../services/signal';
import { useLocalVideoStream } from '../services/video-stream';
import { makeCall } from '../services/web-rtc';
import Chat from './Chat';

export default function MakeCall() {
  const localStream = useLocalVideoStream().stream;
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!localStream) return;
    (async () => {
      console.log('calling');
      const { peerConnection, offer } = await makeCall(localStream);
      console.log('call made', offer);
      publish({
        type: 'offer',
        payload: {
          sdp: offer.sdp!
        }
      });
      setPeerConnection(peerConnection);
    })();
  }, [localStream]);

  useEffect(() => {
    if (!peerConnection) return;
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
  }, [peerConnection]);

  // useEffect(() => {
  //   if (!peerConnection || !localStream) return;
  //   localStream.getTracks().forEach(track => {
  //     console.log('adding track to peer connection', track);
  //     peerConnection.addTrack(track, localStream);
  //   });
  // }, [peerConnection, localStream]);

  useEffect(() => {
    if (!peerConnection) return;

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

    peerConnection.addEventListener('connectionstatechange', () => {
      if (peerConnection.connectionState === 'connected') {
        console.log('caller connected');
      }
    });
  }, [peerConnection]);
  
  return (
    <div>
      <Chat stream={localStream} />
    </div>
  );
}