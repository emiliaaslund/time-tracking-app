import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TimerIcon from "@mui/icons-material/Timer";
import PageviewIcon from "@mui/icons-material/Pageview";

function Navbar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <BottomNavigation
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          paddingBottom: "10px",
          display: "flex",
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
          to="/timer"
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
  );
}

export default Navbar;
