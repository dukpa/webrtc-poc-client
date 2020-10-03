import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { answerCall } from '../services/web-rtc';
import Chat from './Chat';

export default function AnswerCall() {
  const { sdp } = useParams<{sdp : string}>();
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    (async () => {
      const { peerConnection } = await answerCall(sdp);
      setPeerConnection(peerConnection);
    })();
  }, [sdp]);

  return <Chat peerConnection={peerConnection} />
}