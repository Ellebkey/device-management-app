import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDevices } from '../../context/DeviceContext';

const DeleteDeviceModal = () => {
  const { isDeleteDeviceModalOpen, setIsDeleteDeviceModalOpen, currentDevice } = useDevices();

  const handleClose = () => {
    setIsDeleteDeviceModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDeleteDeviceModalOpen(false);
  };

  return (
    <Dialog open={isDeleteDeviceModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <div className="flex justify-between items-center px-4 pt-4">
        <Typography variant="h6" className="font-bold">
          Delete device?
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </div>

      {currentDevice && (
        <>
          <DialogContent>
            <div className="space-y-4 mt-2">
              <Typography variant="subtitle2" className="mb-1 text-gray-700">
                You are about to delete the device {currentDevice.system_name}. This action cannot be undone.
              </Typography>
            </div>
          </DialogContent>

          <DialogActions className="p-4">
            <Button onClick={handleClose} className="normal-case">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="error" className="normal-case">
              Delete
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default DeleteDeviceModal;
