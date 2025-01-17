import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteDeviceModal from './DeleteDeviceModal';
import { useDevices } from '../../context/DeviceContext';

jest.mock('../../context/DeviceContext', () => ({
  useDevices: jest.fn(),
}));

describe('DeleteDeviceModal Component', () => {
  let mockSetIsDeleteDeviceModalOpen;
  let mockDeleteDevice;
  let mockCurrentDevice;

  beforeEach(() => {
    mockSetIsDeleteDeviceModalOpen = jest.fn();
    mockDeleteDevice = jest.fn();
    mockCurrentDevice = { id: 1, system_name: 'Device1' };

    useDevices.mockReturnValue({
      isDeleteDeviceModalOpen: true,
      setIsDeleteDeviceModalOpen: mockSetIsDeleteDeviceModalOpen,
      currentDevice: mockCurrentDevice,
      deleteDevice: mockDeleteDevice,
    });
  });

  it('renders correctly with the current device details', () => {
    render(<DeleteDeviceModal />);

    expect(screen.getByText('Delete device?')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        const hasText = (node) =>
          node.textContent === 'You are about to delete the device Device1. This action cannot be undone.';
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children || []).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls setIsDeleteDeviceModalOpen(false) when cancel button is clicked', () => {
    render(<DeleteDeviceModal />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockSetIsDeleteDeviceModalOpen).toHaveBeenCalledWith(false);
  });

  it('calls setIsDeleteDeviceModalOpen(false) and deleteDevice on delete button click', () => {
    render(<DeleteDeviceModal />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDeleteDevice).toHaveBeenCalledWith(1); // Assuming currentDevice.id is 1
    expect(mockSetIsDeleteDeviceModalOpen).toHaveBeenCalledWith(false);
  });

  it('calls setIsDeleteDeviceModalOpen(false) when close icon is clicked', () => {
    render(<DeleteDeviceModal />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockSetIsDeleteDeviceModalOpen).toHaveBeenCalledWith(false);
  });

  it('does not render content if currentDevice is null', () => {
    useDevices.mockReturnValueOnce({
      isDeleteDeviceModalOpen: true,
      setIsDeleteDeviceModalOpen: mockSetIsDeleteDeviceModalOpen,
      currentDevice: null,
      deleteDevice: mockDeleteDevice,
    });

    render(<DeleteDeviceModal />);

    expect(screen.queryByText('Delete device?')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('does not render if isDeleteDeviceModalOpen is false', () => {
    useDevices.mockReturnValueOnce({
      isDeleteDeviceModalOpen: false,
      setIsDeleteDeviceModalOpen: mockSetIsDeleteDeviceModalOpen,
      currentDevice: mockCurrentDevice,
      deleteDevice: mockDeleteDevice,
    });

    render(<DeleteDeviceModal />);

    expect(screen.queryByText('Delete device?')).not.toBeInTheDocument();
  });
});
