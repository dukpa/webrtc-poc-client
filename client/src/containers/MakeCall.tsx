import React, { useEffect, useState } from 'react';
import { useLocalVideoStream } from '../services/video-stream';
import { makeCall } from '../services/web-rtc';
import Chat from './Chat';

export default function MakeCall() {
  const localStream = useLocalVideoStream().stream;

  const [init, setInit] = useState<Boolean>(false);
  useEffect(() => {
    if (!init && localStream) {
      makeCall(localStream);
      setInit(true);
    }
  }, [localStream, init]);
  
  return (
    <div>
      <Chat stream={localStream} />
    </div>
  );
}