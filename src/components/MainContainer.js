import React from 'react';
import DeviceList from './devices/DeviceList';
import Header from "./shared/Header";

export default function MainContainer() {

  return (
    <div className="flex h-screen">
      <div className="w-full overflow-y-auto">
        <Header />
        <DeviceList />
      </div>
    </div>
  );
}
