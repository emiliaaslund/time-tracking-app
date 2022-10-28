import React, { useState, useEffect, useContext, createContext } from "react";
import { getProjects } from "../api/api";

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const initialState = [];

  const [projects, setProjects] = useState([]);

  const getProjectData = async () => {
    const data = await getProjects();
    setProjects(data);
    // console.log(projects, "hej från projectcontext");
  };

  useEffect(() => {
    getProjectData();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, getProjectData }}>
      {children}
    </ProjectContext.Provider>
  );
}
// 3. Skapa en egen useContext
export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects är utanför PRojectProvidern");
  }

  return context;
}
