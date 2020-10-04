import React, { Fragment } from 'react';
import AnswerCall from '../containers/AnswerCall';
import MakeCall from '../containers/MakeCall';

function App() {
  return (
    <Fragment>
      <MakeCall />
      <AnswerCall />
    </Fragment>
  );
}

export default App;