import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AnswerCall from '../containers/AnswerCall';

import LandingPage from '../containers/LandingPage';
import MakeCall from '../containers/MakeCall';

function App() {
  return (
    <BrowserRouter>
      <Route path="/call">
        <MakeCall />
      </Route>
      <Route path="/answer/:sdp">
        <AnswerCall />
      </Route>
      <Route path="/">
        <LandingPage />
      </Route>
    </BrowserRouter>
  );
}

export default App;