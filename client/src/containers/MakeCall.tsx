import React, { useEffect, useState } from 'react';
import VideoDisplay from '../components/VideoDisplay';
import { useLocalVideoStream } from '../services/video-stream';
import { makeCall } from '../services/web-rtc';

export default function MakeCall() {
  const localStream = useLocalVideoStream().stream;

  const [init, setInit] = useState<Boolean>(false);
  useEffect(() => {
    if (!init && localStream) {
      makeCall(localStream);
      setInit(true);
    }
  }, [localStream, init]);
  
  return <VideoDisplay stream={localStream} />;
}