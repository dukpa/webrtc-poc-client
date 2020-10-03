import React, { CSSProperties, useEffect, useRef, useState } from 'react';

const constraints : MediaStreamConstraints = {
  video: true,
  audio: true
};

const videoStyle : CSSProperties = {
  height: '100%',
  width: '100%'
};

export default function VideoDisplay() {
  const [waitingForCamera, setWaitingForCamera] = useState<boolean>(true);
  const [isError, setError] = useState<boolean>(false);
  // const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setWaitingForCamera(false);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    initialize().catch(err => {
      console.error(err);
      setError(true);
    });
  }, []);

  return (
    <div>
      {
        waitingForCamera &&
        <div>Retrieving camera feed</div>
      }
      {
        (waitingForCamera || isError) &&
        <div>Please allow access to video</div>
      }
      {
        !waitingForCamera && !isError &&
        <video ref={videoRef} style={videoStyle} autoPlay />
      }
    </div>
  )
}