import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeviceList from './DeviceList';
import { useDevices } from '../../context/DeviceContext';

// Mock useDevices
jest.mock('../../context/DeviceContext', () => ({
  useDevices: jest.fn(),
}));

describe('DeviceList Component', () => {
  let mockDevices;
  let mockFetchDevices;
  let mockSetIsDeleteDeviceModalOpen;
  let mockSetIsAddDeviceModalOpen;
  let mockSetCurrentDevice;

  beforeEach(() => {
    mockDevices = [
      { system_name: 'Device1', type: 'WINDOWS', hdd_capacity: 500 },
      { system_name: 'Device2', type: 'MAC', hdd_capacity: 256 },
    ];
    mockFetchDevices = jest.fn();
    mockSetIsDeleteDeviceModalOpen = jest.fn();
    mockSetIsAddDeviceModalOpen = jest.fn();
    mockSetCurrentDevice = jest.fn();

    useDevices.mockReturnValue({
      devices: mockDevices,
      deviceTypes: [],
      loading: false,
      error: null,
      fetchDevices: mockFetchDevices,
      setIsDeleteDeviceModalOpen: mockSetIsDeleteDeviceModalOpen,
      setIsAddDeviceModalOpen: mockSetIsAddDeviceModalOpen,
      setCurrentDevice: mockSetCurrentDevice,
    });
  });

  it('renders the device list with devices', () => {
    render(<DeviceList />);

    expect(screen.getByText('Device')).toBeInTheDocument();
    expect(screen.getByText('Device1')).toBeInTheDocument();
    expect(screen.getByText('Device2')).toBeInTheDocument();
  });

  it('shows a loading indicator when loading is true', () => {
    useDevices.mockReturnValueOnce({
      devices: [],
      loading: true,
      error: null,
      fetchDevices: mockFetchDevices,
    });

    render(<DeviceList />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays an error message if error exists', () => {
    useDevices.mockReturnValueOnce({
      devices: [],
      loading: false,
      error: 'Failed to load devices',
      fetchDevices: mockFetchDevices,
    });

    render(<DeviceList />);
    expect(screen.getByText('Failed to load devices')).toBeInTheDocument();
  });

  it('handles the Edit menu action', async () => {
    render(<DeviceList />);

    const moreButton = screen.getAllByLabelText('more')[0];
    fireEvent.click(moreButton);

    const editButton = await screen.findByText('Edit');
    fireEvent.click(editButton);

    expect(mockSetCurrentDevice).toHaveBeenCalledWith(mockDevices[0]);
    expect(mockSetIsAddDeviceModalOpen).toHaveBeenCalledWith(true);
  });

  it('handles the Delete menu action', async () => {
    render(<DeviceList />);

    const moreButton = screen.getAllByLabelText('more')[1];
    fireEvent.click(moreButton);

    const deleteButton = await screen.findByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockSetCurrentDevice).toHaveBeenCalledWith(mockDevices[1]);
    expect(mockSetIsDeleteDeviceModalOpen).toHaveBeenCalledWith(true);
  });

  it('calls fetchDevices on mount', () => {
    render(<DeviceList />);
    expect(mockFetchDevices).toHaveBeenCalled();
  });
});
