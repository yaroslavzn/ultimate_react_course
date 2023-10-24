import React from 'react';

const RestartButton = ({ onRestart }) => {
  return (
    <button className="btn btn-ui" onClick={() => onRestart()}>
      Restart Quiz
    </button>
  );
};

export default RestartButton;
