import React, { useState, useEffect, useContext, createContext } from "react";
import { getTimeLogs } from "../api/api";

export const TimeLogContext = createContext();

export function TimelogProvider({ children }) {
  const initialState = [];

  const [timeLogs, setTimeLogs] = useState([]);

  const getTimeLogData = async () => {
    const data = await getTimeLogs();
    setTimeLogs(data);
    // console.log(timeLogs, "hej från timecontext");
  };

  useEffect(() => {
    getTimeLogData();
  }, []);

  return (
    <TimeLogContext.Provider
      value={{
        timeLogs,
        getTimeLogData,
      }}
    >
      {children}
    </TimeLogContext.Provider>
  );
}
// 3. Skapa en egen useContext
export function useTimeLogs() {
  const context = useContext(TimeLogContext);
  if (!context) {
    throw new Error("useTimeLog är utanför Providern");
  }

  return context;
}
