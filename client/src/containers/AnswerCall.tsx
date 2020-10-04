import React, { useEffect, useState } from 'react';
import { publish, subscribe } from '../services/signal';
import { answerCall } from '../services/web-rtc';
import Chat from './Chat';

export default function AnswerCall() {
  const [remoteStream] = useState<MediaStream>(() => new MediaStream());

  useEffect(() => {
    subscribe(async (message) => {
      if (message.type === 'offer') {
        const { sdp } = message.payload;
        console.log('answering', sdp);
        const { peerConnection, answer } = await answerCall(remoteStream, sdp!);
        console.log('answered call:', answer);
        publish({
          type: 'answer',
          payload: {
            sdp: answer.sdp!
          }
        });
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
    });
  }, [remoteStream]);

  return <Chat stream={remoteStream} />
}