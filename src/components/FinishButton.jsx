import React from 'react';

const FinishButton = ({ onFinish }) => {
  return (
    <button className="btn btn-ui" onClick={() => onFinish()}>
      Finish
    </button>
  );
};

export default FinishButton;
