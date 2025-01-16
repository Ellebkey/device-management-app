import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import api from '../providers/api';
import _ from 'lodash';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [isDeleteDeviceModalOpen, setIsDeleteDeviceModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [sortBy, setSortBy] = useState('name-asc');

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/devices");
      setDevices(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch devices. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredDevices = useMemo(() => {
    let result = [...devices];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(device =>
        device.system_name.toLowerCase().includes(searchLower)
      );
    }

    if (deviceTypes.length > 0) {
      result = result.filter((device) => deviceTypes.includes(device.type));
    }

    switch (sortBy) {
      case 'hdd-desc':
        result = _.orderBy(result, ['hdd_capacity'], ['desc']);
        break;
      case 'hdd-asc':
        result = _.orderBy(result, ['hdd_capacity'], ['asc']);
        break;
      case 'name-desc':
        result = _.orderBy(result, ['system_name'], ['desc']);
        break;
      case 'name-asc':
        result = _.orderBy(result, ['system_name'], ['asc']);
        break;
      default:
        break;
    }

    return result;
  }, [devices, searchTerm, deviceTypes, sortBy]);

  const debouncedSetSearch = useCallback(
    _.debounce((value) => {
      setSearchTerm(value);
    }, 300),
    []
  );

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
    devices: filteredDevices,
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
    searchTerm,
    debouncedSetSearch,
    deviceTypes,
    setDeviceTypes,
    sortBy,
    setSortBy,
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
