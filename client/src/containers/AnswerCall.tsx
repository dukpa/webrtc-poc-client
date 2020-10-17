import React, { useEffect, useState } from 'react';
import VideoDisplay from '../components/VideoDisplay';
import { answerCall } from '../services/web-rtc';

export default function AnswerCall() {
  const [remoteStream] = useState<MediaStream>(() => new MediaStream());

  const [init, setInit] = useState<Boolean>(false);
  useEffect(() => {
    if (!init && remoteStream) {
      answerCall(remoteStream);
      setInit(true);
    }
  }, [remoteStream, init]);

  return <VideoDisplay stream={remoteStream} />
}