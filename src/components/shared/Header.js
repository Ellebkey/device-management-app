import React from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

const DeviceList = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ninjaOne
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DeviceList;
