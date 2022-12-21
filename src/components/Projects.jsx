import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <div>
      <List data-testid="list">
        {projects.map((project) => (
          <ListItem button key={project.id} data-testid="listitems">
            <ListItemText
              primary={project.name}
              data-testid="item"
            ></ListItemText>
            <Button
              color="secondary"
              onClick={() => deleteProject(project.id)}
              data-testid="deletebtn"
            >
              X
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Projects;
