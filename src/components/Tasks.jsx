import React, { useState } from "react";
import axios from "axios";

//material ui
import { List, ListItem, ListItemText, Button } from "@mui/material";

//Context
import { useTasks } from "../context/TaskContext";

function Tasks() {
  const { tasks, getTaskData } = useTasks();
  const [secondary, setSecondary] = useState(false);

  function handleShowTask(id) {
    setSecondary(true);
    if (secondary === true) {
      setSecondary(false);
    }
    // console.log(id);
  }

  const deleteTask = async (id) => {
    const removeId = tasks.filter((task) => task.id === id);
    const { data } = await axios.delete(`http://localhost:3000/tasks/${id}`);
    // console.log(`task med id:${id} har raderats`);
    getTaskData();
  };

  return (
    <div>
      <List>
        {tasks.map((task) => (
          <ListItem
            button
            key={task.id}
            onClick={(e) => handleShowTask(task.id)}
          >
            <ListItemText
              primary={task.name}
              secondary={secondary ? `Added: ${task.date} ` : null}
            ></ListItemText>
            <Button color="secondary" onClick={() => deleteTask(task.id)}>
              X
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Tasks;
