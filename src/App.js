import React, { useState, useEffect } from "react";
import "./App.css";
import $ from "jquery";

function App() {
  const array = [
    "image/14.png",
    "image/15.jpg",
    "image/16.jpg",
    "image/17.jpg",
    "image/18.jpg",
    "image/19.jpg",
    "image/20.jpg",
    "image/21.jpg",
    "image/22.jpg",
    "image/23.jpg",
    "image/24.jpg",
    "image/25.jpg",
    "image/26.jpg",
  ];

  const [isdraggable, setDraggable] = useState("false");
  const [gameover, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  let [stringcheck, setStringCheck] = useState("");
  let [top, setTop] = useState("");
  let [left, setLeft] = useState("");
  let [random, setRandom] = useState("");

  //TO BREAK STRING AND FIND DYNAMIC LENGTH AND WIDTH
  // let string = "LETS SEE IF YOU CAN JOIN US";
  // const strarray = string.split(" ");
  // const strlength = strarray.length;
  // const dynamicWidth = 1000 / strlength + "px";

  let stringarray = [
    "image/0.jpg",
    "image/1.jpg",
    "image/2.jpg",
    "image/3.jpg",
    "image/4.jpg",
    "image/5.jpg",
    "image/6.jpg",
    "image/7.jpg",
    "image/8.jpg",
    "image/9.jpg",
    "image/10.png",
    "image/11.png",
    "image/12.png",
    "image/13.png",
  ];

  let strarray = setTimeout(() => {
    let sarray = [];
    let x = Math.floor(Math.random() * stringarray.length);
    for (let i = 0; i < 5; i++) {
      let temp = stringarray[x];
      sarray.push(temp);
    }
    return sarray;
    console.log(sarray);
  }, 1000);

  console.log(strarray);
  console.log(strarray[0]);
  console.log(strarray[1]);
  console.log(strarray[2]);
  console.log(strarray[3]);
  console.log(strarray[4]);

  //TO CHANGE NUMBER OF WORDS IN BOX
  let totalarray = strarray.concat(array).slice(0, 9);

  //RANDOM POSITION

  // let random = {
  //   left: Math.random() * 400 + "px",
  //   top: Math.random() * 400 + "px",
  // };
  // let randomTop = 50 + "px";
  // let randomLeft = 50 + "px";
  // let random = {
  //   position: "absolute",
  //   height: "50px",
  //   width: dynamicWidth,
  //   backgroundColor: "black",
  //   color: "white",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   textAlign: "center",
  // };

  // let random = {
  //   left: Math.random() * 400 + "px",
  //   top: Math.random() * 400 + "px",
  //   position: "absolute",
  // };
  // for (var i = 0; i < 15; i++) {
  //   $(".jumbleBox").append('<div class="random"></div>');
  // }
  // $(".random").each(function (index) {
  //   $(this).css({
  //     left: Math.random() * ($(".jumbleBox").width() - $(this).width()),
  //     top: Math.random() * ($(".jumbleBox").height() - $(this).height()),
  //     position: "absolute",
  //   });
  // });

  //TIMER HOOKS

  //TO CHANGE TIMER IN SECONDS
  const [seconds, setSeconds] = useState(15);
  const [isActive, setIsActive] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [timetaken, setTimeTaken] = useState("");
  const [timeover, setTimeOver] = useState(false);

  function toggle() {
    setIsActive(!isActive);
    setDraggable(isdraggable ? true : false);
  }

  function stop() {
    setTimeTaken(15 - seconds);
    setIsActive(false);
    setStopped(true);
    setSeconds(timetaken);
    setDraggable(false);
    setGameOver(true);
    {
      strarray.map((e, index) => {
        let box = document.getElementById(`arrangeBox${index}`);
        let word = box.getElementsByTagName("img")[0].src.slice(28, -4);
        stringcheck = stringcheck + word;
        console.log(stringcheck);
      });
    }

    let compare = stringcheck.slice(1).localeCompare(12345);
    if (compare === 0) {
      setWon(true);
    } else {
      setWon(false);
    }
    console.log(compare);
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) =>
          seconds > 0 ? seconds - 1 : setTimeOver(true)
        );
        setDraggable(timeover ? false : isdraggable);
        setGameOver(timeover ? true : gameover);
      }, 3000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  //DRAG AND DROP HOOKS
  const drop = (e) => {
    e.preventDefault();
    const card_id = e.dataTransfer.getData("text");
    const card = document.getElementById(card_id);
    e.target.appendChild(card);
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragStart = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };
  const dragEnd = (e) => {
    e.target.classList.toggle("random");
  };

  return (
    <div>
      <div className="client">
        {/* TIMER DIV */}
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
            <button className="button" onClick={stop}>
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

        {/*JUMBLEBOX */}
        <div className="jumbleBox" onDrop={drop} onDragOver={dragOver}>
          {totalarray.map((e, index) => {
            return (
              <img
                className="random jumble_img"
                id={`stringBox${index}`}
                key={index}
                draggable={isdraggable}
                onDragStart={dragStart}
                onDragEnd={dragEnd}
                style={{
                  height: "150px",
                  width: "150px",
                  background: "rgb(0,0,0)",
                  background:
                    "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)",
                  color: "white",
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  objectFit: "cover",
                  left: Math.random() * 800 + "px",
                  top: Math.random() * 100 + "px",
                }}
                src={e}
              />
            );
          })}
        </div>
        <div className="arrangeBox_div">
          {strarray.map((e, index) => {
            return (
              <div
                className="arrangeBox"
                id={`arrangeBox${index}`}
                key={index}
                onDrop={drop}
                onDragOver={dragOver}
                style={{
                  height: "150px",
                  width: "150px",
                }}
              ></div>
            );
          })}
        </div>

        <div className="stringBox">
          {/* <h1 className="stringBox_h1" style={{ fontSize: "48px" }}>
            {string}
          </h1> */}
          {strarray.map((e) => {
            return (
              <div className="jumble_image_div">
                <img className="jumble_image" src={e} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
