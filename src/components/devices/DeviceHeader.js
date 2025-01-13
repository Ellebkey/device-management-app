import React from "react";
import { Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const DeviceHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Typography variant="h4" className="font-bold text-gray-800">
        Devices
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        className="text-white"
      >
        <span className="normal-case">Add device</span>
      </Button>
    </div>
  );
};

export default DeviceHeader;
