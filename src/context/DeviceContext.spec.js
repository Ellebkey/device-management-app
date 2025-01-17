import React from 'react';
import { render, act } from '@testing-library/react';
import { DeviceProvider, useDevices } from './DeviceContext';
import api from '../providers/api';

jest.mock('../providers/api');
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
  })),
}));

const TestComponent = ({ callback }) => {
  const context = useDevices();
  callback(context);
  return null;
};

describe('DeviceProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches devices and sets them in state', async () => {
    const mockDevices = [
      { id: 1, system_name: 'Device1', type: 'WINDOWS', hdd_capacity: 500 },
      { id: 2, system_name: 'Device2', type: 'MAC', hdd_capacity: 256 },
    ];
    api.get.mockResolvedValueOnce({ data: mockDevices });

    let context;
    render(
      <DeviceProvider>
        <TestComponent callback={(ctx) => (context = ctx)} />
      </DeviceProvider>
    );

    await act(async () => {
      context.fetchDevices();
    });

    expect(api.get).toHaveBeenCalledWith('/devices');
    expect(context.devices).toEqual(mockDevices);
    expect(context.loading).toBe(false);
    expect(context.error).toBeNull();
  });

  it('adds a new device', async () => {
    const newDevice = { id: 3, system_name: 'Device3', type: 'LINUX', hdd_capacity: 128 };
    api.post.mockResolvedValueOnce({ data: newDevice });

    let context;
    render(
      <DeviceProvider>
        <TestComponent callback={(ctx) => (context = ctx)} />
      </DeviceProvider>
    );

    await act(async () => {
      const response = await context.addDevice(newDevice);
      expect(response.success).toBe(true);
    });

    expect(api.post).toHaveBeenCalledWith('/devices', newDevice);
    expect(context.devices).toContainEqual(newDevice);
  });

  it('handles device deletion', async () => {
    const devices = [
      { id: 1, system_name: 'Device1', type: 'WINDOWS', hdd_capacity: 500 },
      { id: 2, system_name: 'Device2', type: 'MAC', hdd_capacity: 256 },
    ];
    api.get.mockResolvedValueOnce({ data: devices });
    api.delete.mockResolvedValueOnce({});

    let context;
    render(
      <DeviceProvider>
        <TestComponent callback={(ctx) => (context = ctx)} />
      </DeviceProvider>
    );

    await act(async () => {
      context.fetchDevices();
    });

    await act(async () => {
      const response = await context.deleteDevice(1);
      expect(response.success).toBe(true);
    });

    expect(api.delete).toHaveBeenCalledWith('/devices/1');
    expect(context.devices).toHaveLength(1);
    expect(context.devices).not.toContainEqual(devices[0]);
  });

  // Add more tests for filtering and sorting logic as needed
});
