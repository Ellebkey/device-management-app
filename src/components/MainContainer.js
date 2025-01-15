import React from 'react';
import DeviceList from './devices/DeviceList';
import Header from "./shared/Header";
import { DeviceProvider } from '../context/DeviceContext';
import AddDeviceModal from './devices/AddDeviceModal';
import DeleteDeviceModal from "./devices/DeleteDeviceModal";

export default function MainContainer() {
  return (
    <DeviceProvider>
      <div className="flex h-screen">
        <div className="w-full overflow-y-auto">
          <Header />
          <DeviceList />
          <AddDeviceModal />
          <DeleteDeviceModal />
        </div>
      </div>
    </DeviceProvider>
  );
}
