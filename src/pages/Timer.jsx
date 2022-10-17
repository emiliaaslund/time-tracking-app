import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

import TimerClock from "../components/TimerClock";

function Timer() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          p: "30px",
        }}
      >
        <Typography variant="h3" align="center" m={5}>
          Timer
        </Typography>
        <TimerClock />
      </Box>
    </Container>
  );
}

export default Timer;
