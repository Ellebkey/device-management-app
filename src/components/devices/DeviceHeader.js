import React from "react";
import { Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDevices } from '../../context/DeviceContext';

const DeviceHeader = () => {
  const { setIsAddDeviceModalOpen } = useDevices();

  return (
    <div className="flex justify-between items-center mb-4">
      <Typography variant="h4" className="font-bold text-gray-800">
        Devices
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        style={{backgroundColor: '#337AB7', textTransform: 'none'}}
        onClick={() => setIsAddDeviceModalOpen(true)}
      >
        <span className="normal-case">Add device</span>
      </Button>
    </div>
  );
};

export default DeviceHeader;
