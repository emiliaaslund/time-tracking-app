import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import { ProjectProvider } from "../context/ProjectContext";
import { TaskProvider } from "../context/TaskContext";
import { TimelogProvider } from "../context/TimelogContext";

function Root() {
  return (
    <>
      <ProjectProvider>
        <TaskProvider>
          <TimelogProvider>
            <Outlet />
            <Navbar />
          </TimelogProvider>
        </TaskProvider>
      </ProjectProvider>
    </>
  );
}

export default Root;
