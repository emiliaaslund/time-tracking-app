import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimerIcon from "@mui/icons-material/Timer";
import PageviewIcon from "@mui/icons-material/Pageview";

function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <BottomNavigation
          sx={{
            width: "100%",
            height: "65px",
            position: "fixed",
            bottom: 0,
            paddingBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Timer"
            icon={<TimerIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="calendar"
            label="Calendar"
            icon={<CalendarMonthIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="overview"
            label="Overview"
            icon={<PageviewIcon />}
          />
        </BottomNavigation>
      </Box>
    </Container>
  );
}

export default Navbar;
