import React from 'react';

const Progress = ({
  points,
  maxPoints,
  currIndex,
  maxIndex,
  alreadyAnswered,
}) => {
  return (
    <header className="progress">
      <progress
        max={maxIndex}
        value={alreadyAnswered ? currIndex + 1 : 0}
      ></progress>
      <p>
        Question <strong>{currIndex + 1}</strong> / {maxIndex}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
};

export default Progress;
