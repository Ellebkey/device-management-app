import React, { useEffect, useState } from "react";
import { Card, Typography, CircularProgress } from "@mui/material";
import { Computer } from "@mui/icons-material";
import DeviceFilterBar from "./DeviceFilterBar";
import api from "../../providers/api";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const { data } = await api.get("/devices");
        // Simulate delay to mimic API response time
        await new Promise(r => setTimeout(r, 2000))
        setDevices(data);
      } catch (err) {
        setError("Failed to fetch devices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (

    <div className="p-6 bg-white">
      <Typography variant="h4" className="font-bold text-gray-800 mb-4">
        Devices
      </Typography>
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
                className="p-4 rounded-none shadow-none"
                elevation={0}
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <Computer className="text-gray-500"/>
                    </div>
                    <Typography variant="subtitle1" className="font-bold text-gray-900">
                      {device.system_name}
                    </Typography>
                  </div>

                  <Typography variant="body2" className="text-gray-600 mt-1">
                    {device.type} workstation - {device.hdd_capacity} GB
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default DeviceList;
