import axios from "axios";

//GET TASK
export async function getTask() {
  const res = await axios.get("http://localhost:3000/tasks");
  console.log(res.data);
}

//POST TASK
export async function makeNewTask() {
  const res = await axios.post("http://localhost:3000/tasks");
  console.log(res.data);
}

//DELETE
