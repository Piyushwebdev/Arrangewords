import React, { useState, useEffect, useRef } from "react";
import "./Landing.css";
import Timer from "./Timer";

function Landing() {
  const [checkWon, setCheckWon] = useState(false);
  let stringarray = ["I", "LOVE", "MY", "COUNTRY", "AND"];
  let string = [
    "YOU",
    "SECULAR",
    "SOCIAL",
    "PIYUSH",
    "DEMOCRACY",
    "SHALINI",
    "ABHAY",
    "AND",
    "YOU",
    "ARE",
    "AWESOME",
  ];
  let tstring = stringarray.concat(string);
  // Making of stringarray
  // let [stringarray, setstringarray] = React.useState([]);

  // function randomArray() {
  //   const arr = stringarray;
  //   let j = stringarray.length;
  //   for (let i = 0; i < 5; i++) {
  //     let x = Math.floor(Math.random() * (j - 1));
  //     arr.push(stringarray[x]);
  //     stringarray.splice(x, 1);
  //     j--;
  //   }

  //   setstringarray(arr);
  // }

  // React.useEffect(() => {
  //   if (stringarray.length === 0) {
  //     randomArray();
  //   }
  // });

  //DRAG AND DROP FUNCTIONS
  function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
    check(data);
  }

  const dragEnd = (e) => {
    if (e.target.classList === "position") {
      e.target.classList.remove("position");
      e.target.classList.add("randomBox");
    } else {
      e.target.classList.remove("randomBox");
      e.target.classList.add("position");
    }
  };
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragStart = (e) => {
    var data2 = e.dataTransfer.setData("text", e.target.id);
  };

  function check(data) {
    let compare = [];
    stringarray.map((value, i) => {
      compare.push(data.localeCompare(stringarray[i]));
    });

    let loose = compare.every((val) => val === 0);
    console.log(loose);
  }

  const [draggable, setDraggable] = useState(false);

  const positions = [];

  string.forEach((value) => {
    positions.push({
      left: Math.random() * 1000 + "px",
      top: Math.random() * 250 + "px",
    });
  });

  return (
    <div className="client">
      <Timer
        check={check}
        checkWon={checkWon}
        changeDraggable={setDraggable}
        stringarray={stringarray}
      />

      {/*JUMBLEBOX */}
      <div
        className="jumbleBox"
        id="jumbleBox"
        onDrop={drop}
        onDragOver={dragOver}
      >
        {tstring.map((value, i) => {
          return (
            <div
              className="randomBox"
              id={value}
              onDrop={drop}
              onDragOver={dragOver}
              draggable={`${draggable}`}
              onDragStart={dragStart}
              onDragEnd={dragEnd}
              style={positions.length > 0 ? positions[i] : {}}
            >
              {value}
            </div>
          );
        })}
      </div>
      <div className="arrangeBox_div">
        {stringarray.map((value, i) => (
          <div
            className="arrangeBox"
            id={i}
            onDrop={drop}
            onDragOver={dragOver}
          ></div>
        ))}
      </div>

      <div className="stringBox">
        {stringarray.map((value) => (
          <div className="jumble_image_div">
            <h1 className="jumble_image">{value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
