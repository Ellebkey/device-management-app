import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  FormControl,
  Select,
  FormHelperText,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDevices } from '../../context/DeviceContext';
import api from '../../providers/api';
import { devicesTypes } from "../shared/constants";

const AddDeviceModal = () => {
  const {
    isAddDeviceModalOpen,
    setIsAddDeviceModalOpen,
    currentDevice,
    setCurrentDevice,
  } = useDevices();

  const [formData, setFormData] = useState({
    system_name: '',
    type: '',
    hdd_capacity: '',
  });
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(currentDevice);

  useEffect(() => {
    if (currentDevice) {
      setFormData({
        system_name: currentDevice.system_name,
        type: currentDevice.type,
        hdd_capacity: currentDevice.hdd_capacity,
      });
    } else {
      setFormData({
        system_name: '',
        type: '',
        hdd_capacity: '',
      });
    }
  }, [currentDevice]);

  const handleClose = () => {
    setIsAddDeviceModalOpen(false);
    setFormData({
      system_name: '',
      type: '',
      hdd_capacity: '',
    });
    setErrors({});
    setCurrentDevice(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.system_name.trim()) {
      newErrors.system_name = 'System name is required';
    }
    if (!formData.type) {
      newErrors.type = 'Device type is required';
    }
    if (!formData.hdd_capacity || isNaN(formData.hdd_capacity) || formData.hdd_capacity <= 0) {
      newErrors.hdd_capacity = 'Valid HDD capacity is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        // Update existing device
        await api.put(`/devices/${currentDevice.id}`, formData);
        console.log('Device updated successfully');
      } else {
        // Create new device
        await api.post('/devices', formData);
        console.log('Device created successfully');
      }

      handleClose();
    } catch (error) {
      console.error('Error saving device:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <Dialog
      open={isAddDeviceModalOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center px-4 pt-4">
          <Typography variant="h6" className="font-bold">
            {isEditing ? 'Edit Device' : 'Add Device'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        <DialogContent>
          <div className="space-y-4 mt-2">
            <div>
              <Typography variant="subtitle2" className="mb-1 text-gray-700">
                System Name
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                id="system_name"
                name="system_name"
                value={formData.system_name}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.system_name}
                helperText={errors.system_name}
              />
            </div>

            <div>
              <Typography variant="subtitle2" className="mb-1 text-gray-700">
                Device Type
              </Typography>
              <FormControl fullWidth error={!!errors.type} variant="filled">
                <Select
                  value={formData.type}
                  onChange={handleChange}
                  name="type"
                  displayEmpty
                  variant="outlined"
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={devicesTypes.WINDOWS}>Windows Workstation</MenuItem>
                  <MenuItem value={devicesTypes.MAC}>Mac Workstation</MenuItem>
                  <MenuItem value={devicesTypes.LINUX}>Linux Workstation</MenuItem>
                </Select>
                <FormHelperText>{errors.type}</FormHelperText>
              </FormControl>
            </div>

            <div>
              <Typography variant="subtitle2" className="mb-1 text-gray-700">
                HDD Capacity (GB)
              </Typography>
              <TextField
                hiddenLabel
                fullWidth
                id="hdd_capacity"
                name="hdd_capacity"
                type="number"
                value={formData.hdd_capacity}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.hdd_capacity}
                helperText={errors.hdd_capacity}
              />
            </div>
          </div>
        </DialogContent>

        <DialogActions className="p-4">
          <Button onClick={handleClose} className="normal-case">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" className="normal-case">
            {isEditing ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddDeviceModal;
