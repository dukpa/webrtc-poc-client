import React from 'react';
import VideoDisplay from '../components/VideoDisplay';
import { useVideoStream } from '../services/video-stream';

interface ChatProps {
  peerConnection : RTCPeerConnection | null
}

export default function Chat({ peerConnection } : ChatProps) {
  const { stream } = useVideoStream();

  return (
    <VideoDisplay stream={stream} />
  )
}