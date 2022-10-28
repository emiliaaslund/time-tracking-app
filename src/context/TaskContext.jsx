import React, { useState, useEffect, useContext, createContext } from "react";
import { getTask } from "../api/api";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const initialState = [];

  const [tasks, setTasks] = useState([]);

  const getTaskData = async () => {
    const data = await getTask();
    setTasks(data);
    // console.log(tasks, "hej från taskcontext");
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, getTaskData }}>
      {children}
    </TaskContext.Provider>
  );
}

// Skapa en egen useContext
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks är utanför Providern");
  }

  return context;
}
