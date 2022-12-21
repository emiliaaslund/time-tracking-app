import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

//Material ui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import { MenuItem, Select, TextField } from "@mui/material";

//contex
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

//api
import { addProject, addTask } from "../api/api";

//installera uuid ist.
let randomId = uuidv4();

function AddTask() {
  const { tasks, getTaskData } = useTasks();
  const { projects, getProjectData } = useProjects();
  const [date, setDate] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [taskInput, setTaskInput] = useState("");
  const [projectId, setProjectId] = useState("");

  //måste ha detta för modalen ska funka
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function handleInputTask(e) {
    setTaskInput(e.target.value);
    taskInput = "";
  }

  const handleSubmit = async (e) => {
    if (!taskInput) {
      console.log("You must enter values for all required fields");
    } else {
      const date = dayjs().format("YYYY-MM-DD");
      setDate(date);
      const data = await addTask(randomId, taskInput, projectId, date);
      getTaskData();
      console.log(tasks);
      setTaskInput("");
    }
  };

  const handleChange = (e) => {
    setProjectId(e.target.value);
    console.log(projectId, "projectId");
  };

  return (
    <div>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        Add a new task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            color="secondary"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            m="10px"
            data-testid="title"
          >
            Add a task
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                color="secondary"
                required
                label="Add a new task"
                value={taskInput}
                onChange={handleInputTask}
                inputProps={{
                  "data-testid": "testInput",
                }}
              ></TextField>
              <TextField
                color="secondary"
                label="Project"
                value={projectId}
                onChange={handleChange}
                select
                required
                inputProps={{
                  "data-testid": "select",
                }}
                // data-testid="select"
              >
                {projects.map((project) => (
                  <MenuItem
                    value={project.id}
                    key={project.id}
                    inputProps={{
                      "data-testid": "select-options",
                    }}
                  >
                    {project.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
                inputProps={{
                  "data-testid": "submitBtn",
                }}
              >
                ADD A TASK
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddTask;
