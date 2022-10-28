import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

//material ui
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  MenuItem,
  TextField,
  FormControl,
  ButtonGroup,
} from "@mui/material";

import { addTime } from "../api/api";

//context
import { useTimeLogs } from "../context/TimelogContext";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

let randomId = uuidv4();

function TimerPage() {
  const [project, setProject] = useState("");
  const [task, setTask] = useState("");
  const [projectTasks, setProjectTasks] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { timeLogs, getTimeLogData } = useTimeLogs();
  const { tasks, getTaskData } = useTasks();
  const { projects, getProjectData } = useProjects();
  const [isActive, setIsActive] = useState(false);

  //lägg in icon?
  function toggle() {
    setIsActive(!isActive);
  }

  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  useEffect(() => {
    let timer = null;
    if (isActive) {
      setStartDate(dayjs().format("YYYY-MM-DD"));
      setStartTime(dayjs().format("HH:mm:ss"));
      timer = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      setEndDate(dayjs().format("YYYY-MM-DD"));
      setEndTime(dayjs().format("HH:mm:ss"));
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const saveTime = async () => {
    setIsActive(false);
    if (seconds) {
      const data = await addTime(
        project,
        task,
        startTime,
        endTime,
        startDate,
        endDate,
        randomId
      );
      setSeconds(0);
      getTimeLogData();
    }
  };

  const handleProjectChange = (e) => {
    setProject(e.target.value);
    setProjectTasks(tasks.filter((task) => task.projectId == e.target.value));
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const deleteTime = async (id) => {
    const removeId = timeLogs.filter((timeLog) => timeLog.id === id);
    const { data } = await axios.delete(`http://localhost:3000/timelogs/${id}`);
    getTimeLogData();
  };

  const formatTime = () => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

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
        <Typography sx={{ mb: 3 }} variant="h5" align="center">
          Seconds: {formatTime(seconds)}
        </Typography>
        <Typography
          sx={{ color: "#9c27b0" }}
          mb={3}
          variant="h5"
          align="center"
        >
          {task ? `Task: ${task}` : ""}
        </Typography>
        {!task ? null : (
          <ButtonGroup>
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              mt={2}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={toggle}
            >
              {isActive ? "Pause" : "Start"}
            </Button>

            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              mt={2}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={saveTime}
            >
              Save
            </Button>

            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              mt={2}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={reset}
            >
              Reset
            </Button>
          </ButtonGroup>
        )}
      </Box>
      <div>
        <Box
          align="center"
          sx={{
            bgcolor: "#eeeaea",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: "30px",
            mb: "1px",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <FormControl variant="outlined" fullWidth>
            <Typography mb={2} variant="h6" align="center">
              Choose a project to get started
            </Typography>
            <TextField
              color="secondary"
              label="Project"
              value={project}
              onChange={handleProjectChange}
              select
            >
              {projects.map((project) => (
                <MenuItem value={project.id} key={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          {!project ? null : (
            <FormControl mb={2} variant="outlined" fullWidth>
              <TextField
                color="secondary"
                onChange={handleTaskChange}
                id="task"
                label="Task"
                value={task}
                select
              >
                {projectTasks.map((task) => (
                  <MenuItem value={task.name} key={task.id}>
                    {task.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          )}
        </Box>
      </div>
      <div>
        <List>
          {timeLogs
            .filter((timeLog) => timeLog.projectId == project)
            .map((timeLog) => (
              <ListItem key={timeLog.id}>
                <ListItemText
                  sx={{ color: "#9c27b0" }}
                  primary={timeLog.name}
                  secondary={
                    timeLog.id
                      ? `Starttime: ${timeLog.startTime} Endtime: ${timeLog.endTime}`
                      : null
                  }
                ></ListItemText>
                <Button
                  color="secondary"
                  onClick={() => deleteTime(timeLog.id)}
                >
                  X
                </Button>
              </ListItem>
            ))}
        </List>
      </div>
    </div>
  );
}

export default TimerPage;
