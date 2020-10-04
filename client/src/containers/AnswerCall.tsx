import React, { useEffect, useState } from 'react';
import { answerCall } from '../services/web-rtc';
import Chat from './Chat';

export default function AnswerCall() {
  const [remoteStream] = useState<MediaStream>(() => new MediaStream());

  const [init, setInit] = useState<Boolean>(false);
  useEffect(() => {
    if (!init && remoteStream) {
      answerCall(remoteStream);
      setInit(true);
    }
  }, [remoteStream, init]);

  return <Chat stream={remoteStream} />
}