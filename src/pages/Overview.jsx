import React, { useState } from "react";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";

//material ui
import { Grid, Typography, Box, Tab, Tabs } from "@mui/material";

//context
import { useProjects } from "../context/ProjectContext";
import AddProject from "../components/AddProject";
import AddTask from "../components/AddTask";

function Overview() {
  const [value, setValue] = useState("one");
  const [showTask, setShowTask] = useState(false);
  //För colorfunktionen

  //Fixa tabsen bättre. toggla bara mellan projekt/task
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "two") {
      setShowTask(true);
    } else if (newValue === "one") {
      setShowTask(false);
    }
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
          p: "40px",
          mb: "10px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            sx={{ fontSize: "17px" }}
            value="one"
            variant="fullWidth"
            label="Projects"
          />
          <Tab
            sx={{ fontSize: "17px" }}
            value="two"
            variant="fullWidth"
            label="Tasks"
          />
        </Tabs>
      </Box>
      {!showTask ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                bgcolor: "#eeeaea",
                height: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: "20px",
              }}
            >
              <Typography variant="h6" align="center">
                Active Projects:
              </Typography>
            </Box>
            <Projects />
            <AddProject />
          </Grid>
        </Grid>
      ) : (
        <div>
          <Box
            sx={{
              bgcolor: "#eeeaea",
              height: "25px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: "20px",
              // mt: "10px",
            }}
          >
            <Typography variant="h6" align="center">
              Active Tasks:
            </Typography>
          </Box>
          <Tasks />
          <AddTask />
        </div>
      )}
    </div>
  );
}

export default Overview;
