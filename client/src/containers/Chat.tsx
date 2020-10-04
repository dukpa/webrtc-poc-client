import React from 'react';
import VideoDisplay from '../components/VideoDisplay';

interface ChatProps {
  stream : MediaStream | null
}

export default function Chat({ stream } : ChatProps) {

  return (
    <VideoDisplay stream={stream} />
  )
}