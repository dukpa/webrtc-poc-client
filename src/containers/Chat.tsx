import React, { useState, useEffect } from 'react';
import VideoDisplay from '../components/VideoDisplay';

const constraints : MediaStreamConstraints = {
  video: true,
  audio: true
};

export default function Chat() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(stream);
    };
    initialize();
  }, []);

  return (
    <VideoDisplay stream={stream} />
  )
}