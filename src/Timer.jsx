import React, { useState, useEffect } from "react";
import "./Landing.css";
const Timer = (props) => {
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [timetaken, setTimeTaken] = useState("");
  const [timeover, setTimeOver] = useState(false);
  const [gameover, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const changeDraggable = props.changeDraggable;
  const stringarray = props.stringarray;

  function toggle() {
    setIsActive(!isActive);
    changeDraggable(true);
  }

  function check() {
    setTimeTaken(30 - seconds);
    setIsActive(false);
    setStopped(true);
    setSeconds(timetaken);
    setGameOver(true);
    changeDraggable(false);
    document.getElementById("jumbleBox").style.display = "none";
    let stringword = null;
    let stringvalue = null;
    stringarray.map((value, i) => {
      let box = document.getElementById(i).textContent;
      // let word = box.getElementsByClassName("position");
      stringword = stringword + box;
      console.log(stringword);
      stringvalue = stringvalue + value;
      console.log(stringvalue);
    });
    if (stringword === stringvalue) setWon(true);
    else setWon(false);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) =>
          seconds > 0 ? seconds - 1 : setTimeOver(true)
        );
        setGameOver(timeover ? true : gameover);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="timer">
      {!gameover && !isActive ? <h1>Lets Start</h1> : ""}
      {!gameover && !isActive ? (
        <button className="button" onClick={toggle}>
          Start
        </button>
      ) : (
        ""
      )}
      {isActive ? (
        <button className="button" onClick={check}>
          Stop
        </button>
      ) : (
        ""
      )}
      <h2 className="timeover">
        {timeover
          ? "YOU LOST"
          : `
            ${
              stopped
                ? ` ${won ? "Congrats! YOU WON!" : "YOU LOST"}`
                : "Time Left"
            }
            ${stopped ? " " : `${seconds} s`}`}
      </h2>
    </div>
  );
};

export default Timer;
