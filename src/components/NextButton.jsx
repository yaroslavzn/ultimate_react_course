import React from 'react';

const NextButton = ({ onNextQuestion }) => {
  return (
    <button className="btn btn-ui" onClick={onNextQuestion}>
      Next
    </button>
  );
};

export default NextButton;
