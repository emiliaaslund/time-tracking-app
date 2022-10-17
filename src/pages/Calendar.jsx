import React from "react";
import Typography from "@mui/material/Typography";
import Tasklist from "../components/Tasklist";
import BasicDatePicker from "../components/BasicDatePicker";

function Calendar() {
  return (
    <div>
      <Typography variant="h3" align="center" m={5}>
        Kalender
      </Typography>
      <BasicDatePicker />
      <Tasklist />
    </div>
  );
}

export default Calendar;
