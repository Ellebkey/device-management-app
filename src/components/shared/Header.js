import React from "react";
import { Box, AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#002A42" }}>
        <Toolbar>
          <img src="assets/images/NinjaOneLogo.svg" alt="main-logo" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
