import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";

function TimerClock() {
  let [start, setStart] = useState(false);
  let [stop, setStop] = useState(false);

  function handleStart() {
    start = true;
    setStart();
    console.log(start);
  }
  function handleStop() {
    start = false;
    setStop();
    console.log(start);
  }

  return (
    <div>
      <ButtonGroup sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button onClick={handleStart}>Start</Button>
        <Button onClick={handleStop}>Stop</Button>
      </ButtonGroup>
    </div>
  );
}

export default TimerClock;
