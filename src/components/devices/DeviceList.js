import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Computer, MoreVert } from "@mui/icons-material";
import DeviceHeader from "./DeviceHeader";
import DeviceFilterBar from "./DeviceFilterBar";
import api from "../../providers/api";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const { data } = await api.get("/devices");
        // Simulate delay to mimic API response time
        await new Promise((r) => setTimeout(r, 100));
        setDevices(data);
      } catch (err) {
        setError("Failed to fetch devices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

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
    console.log("Update device:", selectedDevice);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete device:", selectedDevice);
    handleMenuClose();
  };

  return (
    <div className="p-6 bg-white">
      <DeviceHeader/>
      <DeviceFilterBar/>
      <div className="min-h-screen">
        <Typography variant="h5" className="font-bold text-gray-800 mb-4">
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
          <div className="divide-y divide-gray-200">
            {devices.map((device, index) => (
              <Card
                key={index}
                className="p-4 rounded-none shadow-none flex justify-between items-center group hover:bg-gray-100 transition"
                elevation={0}
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    <Computer className="text-gray-500" />
                  </div>
                  <div>
                    <Typography
                      variant="subtitle1"
                      className="font-bold text-gray-900"
                    >
                      {device.system_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-600 mt-1"
                    >
                      {device.type} workstation - {device.hdd_capacity} GB
                    </Typography>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition">
                  <IconButton
                    aria-label="more"
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                    onClick={(event) => handleMenuOpen(event, device)}
                  >
                    <MoreVert />
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
          <MenuItem onClick={handleUpdate}>Edit</MenuItem>
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
