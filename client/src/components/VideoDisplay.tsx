import React, { CSSProperties, useEffect, useRef } from 'react';

const videoStyle : CSSProperties = {
  height: 450,
  width: 800
};

interface VideoDisplayProps {
  stream : MediaStream | null
}

export default function VideoDisplay({ stream } : VideoDisplayProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div>
      {
        stream ?
        <video ref={videoRef} style={videoStyle} autoPlay muted /> :
        <div>Retrieving camera feed</div>
      }
    </div>
  )
}