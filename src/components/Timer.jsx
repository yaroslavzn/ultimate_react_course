import React, { useEffect } from 'react';

const Timer = ({ secondsCountdown, onTick }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onTick]);

  const minutes = Math.floor(secondsCountdown / 60);
  const seconds = secondsCountdown % 60;

  return (
    <div className="timer">
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
};

export default Timer;
