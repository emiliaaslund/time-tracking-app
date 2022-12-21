import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

//material ui
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  Modal,
  Typography,
  Button,
} from "@mui/material";

//api
import { addProject } from "../api/api";
import { useProjects } from "../context/ProjectContext";

//genrerade ett random id
let randomId = uuidv4();

//måste ha för modalen
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

function AddProject() {
  const { projects, getProjectData } = useProjects();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [projectName, setProjectName] = useState("");

  function handleProjectInput(e) {
    setProjectName(e.target.value);
    // console.log(projectName);
  }
  const handleSubmit = async (e) => {
    if (!projectName) {
      alert("You must enter values for all required fields");
    } else {
      const data = await addProject(randomId, projectName);
      getProjectData();
    }
  };

  return (
    <div>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        CREATE A NEW PROJECT
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
          >
            Create a new project
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                color="secondary"
                label="Project name:"
                value={projectName}
                onChange={handleProjectInput}
                inputProps={{
                  "data-testid": "Project",
                }}
              ></TextField>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  handleClose();
                }}
              >
                Add a project
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddProject;
