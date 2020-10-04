import React, { useEffect, useState } from 'react';
import { makeCall } from '../services/web-rtc';
import Chat from './Chat';

export default function MakeCall() {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    (async () => {
      const { peerConnection } = await makeCall();
      setPeerConnection(peerConnection);
    })();
  }, []);

  return <Chat peerConnection={peerConnection} />
}