import React from 'react';
import { useHistory } from 'react-router';

export default function LandingPage() {
  const history = useHistory();
  const goToMakeACall = () => history.push('/call');
  
  return (
    <div>
      <button onClick={goToMakeACall}>Make a call</button>
    </div>
  )
}