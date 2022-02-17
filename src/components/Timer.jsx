import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => (seconds > 0 ? seconds - 1 : "Time Over"));
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="timer">
      <h1>Lets Start</h1>
      <button onClick={toggle}>{isActive ? "Pause" : "Start"}</button>
      <button className="button" onClick={reset}>
        Stop
      </button>

      <h2>Time Left : {seconds}s</h2>
    </div>
  );
};

export default Timer;
