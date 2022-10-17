import React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function Tasklist() {
  const [secondary, setSecondary] = useState(false);

  //mapa ut listorna sen
  //https://codesandbox.io/s/dp0mew?file=/demo.js

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Text only
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Single-line item"
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default Tasklist;
