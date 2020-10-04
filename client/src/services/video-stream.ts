import { useState, useEffect } from 'react';

const constraints : MediaStreamConstraints = {
  video: true,
  audio: true
};

export function useLocalVideoStream() {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(stream);
    };
    initialize();
  }, []);

  return { stream };
}