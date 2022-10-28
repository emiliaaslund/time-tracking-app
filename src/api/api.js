import axios from "axios";

/// GET
export const getTask = async () => {
  const { data } = await axios.get("http://localhost:3000/tasks");
  // console.log(data, "hej från getTask");
  return data;
};

export const getProjects = async () => {
  const { data } = await axios.get("http://localhost:3000/projects");
  // console.log(data, "hej från getProjects");
  return data;
};

export const getTimeLogs = async () => {
  const { data } = await axios.get("http://localhost:3000/timelogs");
  return data;
};

// POST
export const addTask = async (id, name, projectId, date) => {
  const res = await axios.request({
    method: "post",
    url: "http://localhost:3000/tasks",
    data: {
      id: id,
      name: name,
      projectId: projectId,
      date: date,
    },
  });
  return;
};

export const addProject = async (id, name) => {
  const res = await axios.request({
    method: "post",
    url: "http://localhost:3000/projects",
    data: {
      id: id,
      name: name,
    },
  });
  return;
};

export const addTime = async (
  projectId,
  task,
  startTime,
  endTime,
  startDate,
  endDate,
  randomId
) => {
  const res = await axios.request({
    method: "post",
    url: "http://localhost:3000/timelogs",
    data: {
      projectId: projectId,
      name: task,
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
      id: randomId,
    },
  });
  // console.log("tilllagd")
  return;
};
