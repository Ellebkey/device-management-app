import React, { useEffect, useState } from "react";
import { Card, Typography, CircularProgress, IconButton, Menu, MenuItem } from "@mui/material";
import { Computer, MoreVert } from "@mui/icons-material";
import DeviceHeader from "./DeviceHeader";
import DeviceFilterBar from "./DeviceFilterBar";
import { useDevices } from '../../context/DeviceContext';

const DeviceList = () => {
  const { devices, loading, error, fetchDevices, setIsDeleteDeviceModalOpen, setIsAddDeviceModalOpen, setCurrentDevice } = useDevices();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  // Handlers for menu
  const handleMenuOpen = (event, device) => {
    setAnchorEl(event.currentTarget);
    setSelectedDevice(device);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDevice(null);
  };

  const handleUpdate = () => {
    setCurrentDevice(selectedDevice);
    setIsAddDeviceModalOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setCurrentDevice(selectedDevice);
    setIsDeleteDeviceModalOpen(true);
    handleMenuClose();
  };

  const getDeviceIcon = (device) => {
    switch (device.type) {
      case 'WINDOWS':
        return <img src="assets/images/windows-icon.svg" alt="windows" width={24} height={24}/>
      case 'MAC':
        return <img src="assets/images/mac-icon.svg" alt="mac" width={24} height={24}/>
      case 'LINUX':
        return <img src="assets/images/linux-icon.svg" alt="linux" width={24} height={24}/>
      default:
        return <Computer className="text-gray-900"/>;
    }
  }

  return (
    <div className="p-6 bg-white">
      <DeviceHeader/>
      <DeviceFilterBar/>
      <div className="min-h-screen">
        <Typography variant="h5" className="font-bold text-gray-800 mb-4 px-4">
          Device
        </Typography>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <CircularProgress/>
          </div>
        )}

        {error && (
          <Typography variant="body1" className="text-red-500 text-center">
            {error}
          </Typography>
        )}

        {!loading && !error && (
          <div className="divide-y divide-gray-200 border-t-2">
            {devices.map((device, index) => (
              <Card
                key={index}
                className="p-4 rounded-none shadow-none flex justify-between items-center group hover:bg-gray-100 transition"
                elevation={0}
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="mr-2">
                      {getDeviceIcon(device)}
                    </div>
                    <Typography variant="subtitle1" className="font-bold">
                      <span className="text-gray-900">{device.system_name}</span>
                    </Typography>
                  </div>

                  <Typography variant="body2" className="text-gray-600 mt-1">
                    <span className="capitalize">{device.type}</span> workstation - {device.hdd_capacity} GB
                  </Typography>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition">
                  <IconButton
                    aria-label="more"
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, device)}
                  >
                    <MoreVert/>
                  </IconButton>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Menu
          id="device-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem style={{width: '120px'}} onClick={handleUpdate}>Edit</MenuItem>
          <MenuItem
            onClick={handleDelete}
          >
            <span className="text-red-500">Delete</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default DeviceList;
