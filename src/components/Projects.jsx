import React, { useState } from "react";
import axios from "axios";

//material ui
import { Button, ListItem, List, ListItemText } from "@mui/material";

//Context
import { useProjects } from "../context/ProjectContext";

function Projects() {
  const { projects, getProjectData } = useProjects();

  const deleteProject = async (id) => {
    const removeId = projects.filter((project) => project.id === id);
    const { data } = await axios.delete(`http://localhost:3000/projects/${id}`);
    getProjectData();
  };

  return (
    <div>
      <List>
        {projects.map((project) => (
          <ListItem button key={project.id}>
            <ListItemText primary={project.name}></ListItemText>
            <Button color="secondary" onClick={() => deleteProject(project.id)}>
              X
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Projects;
