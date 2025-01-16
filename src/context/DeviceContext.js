import React, { createContext, useState, useContext, useCallback } from 'react';
import api from '../providers/api';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [isDeleteDeviceModalOpen, setIsDeleteDeviceModalOpen] = useState(false);

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/devices");
      console.log(data);
      setDevices(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch devices. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addDevice = useCallback(async (deviceData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/devices", deviceData);
      setDevices(prevDevices => [...prevDevices, data]);
      return { success: true };
    } catch (err) {
      setError("Failed to add device. Please try again.");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDevice = useCallback(async (deviceId) => {
    try {
      await api.delete(`/devices/${deviceId}`);
      setDevices(prevDevices => prevDevices.filter(device => device.id !== deviceId));
      return { success: true };
    } catch (err) {
      setError("Failed to delete device. Please try again.");
      return { success: false, error: err.message };
    }
  }, []);

  const updateDevice = useCallback(async (deviceId, updateData) => {
    try {
      await api.put(`/devices/${deviceId}`, updateData);
      setDevices(prevDevices =>
        prevDevices.map(device => device.id === deviceId ? updateData : device)
      );
      return { success: true };
    } catch (err) {
      setError("Failed to update device. Please try again.");
      return { success: false, error: err.message };
    }
  }, []);

  const value = {
    devices,
    loading,
    error,
    fetchDevices,
    addDevice,
    deleteDevice,
    updateDevice,
    isAddDeviceModalOpen,
    setIsAddDeviceModalOpen,
    isDeleteDeviceModalOpen,
    setIsDeleteDeviceModalOpen,
    currentDevice,
    setCurrentDevice,
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};
