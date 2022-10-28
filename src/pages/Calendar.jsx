import React, { useState, useMemo, useEffect } from "react";
import dayjs from "dayjs";

//material ui
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  TextField,
  Typography,
  Box,
  Container,
  Grid,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

//context
import { useTimeLogs } from "../context/TimelogContext";

function Calendar() {
  const { timeLogs, getTimeLogData } = useTimeLogs();
  const [taskList, setTaskList] = useState([]);
  const [time, setTime] = useState(Date.now());
  const [selectedDate, setSelectedDate] = useState(
    dayjs(time).format("YYYY-MM-DD")
  );

  const handleChange = (selectedDate) => {
    const parsedDate = new Date(selectedDate);
    const date = parsedDate.toLocaleDateString();
    setSelectedDate(date);
  };

  function getTime() {
    const findTime = timeLogs.filter(
      (timeLog) => selectedDate === timeLog.startDate
    );
    // console.log(findTime, "findtime");
    setTaskList(findTime);
  }

  useEffect(() => {
    getTime();
  }, [selectedDate]);
  // console.log(taskList, "tasklist");
  // console.log(selectedDate, "selecteddate");

  return (
    <div>
      <Box
        sx={{
          bgcolor: "#eeeaea",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: "30px",
          mb: "10px",
        }}
      >
        <Typography sx={{ mb: 3 }} variant="h6" align="center">
          Choose a date to se timestamps
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container justifyContent="center">
            <FormControl fullWidth>
              <DatePicker
                sx={{ bgcolor: "#b3e5fc" }}
                label="Pick a day"
                maxDate={new Date()}
                value={selectedDate}
                onChange={handleChange}
                renderInput={(selectedDate) => (
                  <TextField color="secondary" {...selectedDate} />
                )}
              />
            </FormControl>
          </Grid>
        </LocalizationProvider>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <List>
            {taskList
              ? taskList
                  .filter((taskList) => taskList.startDate === selectedDate)
                  .map((taskList) => (
                    <ListItem key={taskList.id}>
                      <ListItemText
                        sx={{ color: "#9c27b0" }}
                        primary={taskList.name}
                        secondary={
                          taskList.id
                            ? `Starttime: ${taskList.startTime},  Endtime: ${taskList.endTime} `
                            : null
                        }
                      ></ListItemText>
                    </ListItem>
                  ))
              : null}
          </List>
        </div>
      </Box>
    </div>
  );
}

export default Calendar;
