import React from "react";
import { Card, Typography } from "@mui/material";
import { Computer } from "@mui/icons-material";

const DeviceList = () => {
  const devices = [
    { name: "DESKTOP-OVCBIFF", type: "Windows workstation", hdd: "128 GB", os: "windows" },
    { name: "LINUX-SMITH-J", type: "Linux workstation", hdd: "64 GB", os: "linux" },
    { name: "WINXP-125498HQ", type: "Windows workstation", hdd: "64 GB", os: "windows" },
    { name: "MAC-SMITH-JOHN", type: "Mac workstation", hdd: "64 GB", os: "mac" },
    { name: "MAC-RODRIGUEZ-J", type: "Mac workstation", hdd: "32 GB", os: "mac" },
    { name: "DESKTOP-OVCBIFF", type: "Windows workstation", hdd: "32 GB", os: "windows" },
    { name: "LINUX-SMITH-J", type: "Linux workstation", hdd: "32 GB", os: "linux" },
    { name: "MAC-ADAMS-R", type: "Mac workstation", hdd: "32 GB", os: "mac" },
  ];

  return (
    <div className="p-6">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Devices
      </Typography>
      <div className="bg-gray-100 min-h-screen">
        <Typography variant="h5" className="font-bold text-gray-800 mb-4">
          Device
        </Typography>

        <div className="divide-y divide-gray-200">
          {devices.map((device, index) => (
            <Card
              key={index}
              className="p-4 rounded-none shadow-none"
              elevation={0}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="mr-2">
                    <Computer className="text-gray-500"/>
                  </div>
                  <Typography variant="subtitle1" className="font-bold text-gray-900">
                    {device.name}
                  </Typography>
                </div>

                <Typography variant="body2" className="text-gray-600 mt-1">
                  {device.type} - {device.hdd}
                </Typography>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>

  );
};

export default DeviceList;
