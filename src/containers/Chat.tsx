import React, { useState, useEffect } from 'react';
import { makeCall } from '../services/web-rtc';
import VideoDisplay from '../components/VideoDisplay';
import { useVideoStream } from '../services/video-stream';

export default function Chat() {
  const { stream } = useVideoStream();
  
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    (async () => {
      const { peerConnection } = await makeCall();
      setPeerConnection(peerConnection);
    })();
  }, []);

  return (
    <VideoDisplay stream={stream} />
  )
}