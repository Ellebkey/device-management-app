import { act }from 'react';
import { render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddDeviceModal from './AddDeviceModal';
import { useDevices } from '../../context/DeviceContext';

jest.mock('../../context/DeviceContext', () => ({
  useDevices: jest.fn(),
}));

describe('AddDeviceModal', () => {
  const mockSetIsAddDeviceModalOpen = jest.fn();
  const mockSetCurrentDevice = jest.fn();
  const mockAddDevice = jest.fn();
  const mockUpdateDevice = jest.fn();

  beforeEach(() => {
    useDevices.mockReturnValue({
      isAddDeviceModalOpen: true,
      setIsAddDeviceModalOpen: mockSetIsAddDeviceModalOpen,
      currentDevice: null,
      setCurrentDevice: mockSetCurrentDevice,
      addDevice: mockAddDevice,
      updateDevice: mockUpdateDevice,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly (smoke test)', () => {
    render(<AddDeviceModal />);

    expect(screen.getByText('Add Device')).toBeInTheDocument();
    expect(screen.getByText('System Name *')).toBeInTheDocument();
    expect(screen.getByText('Device Type *')).toBeInTheDocument();
    expect(screen.getByText('HDD Capacity (GB) *')).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted with empty fields', async () => {
    render(<AddDeviceModal />);

    await act(async () => {
      await userEvent.click(screen.getByTestId('submit-button'));
    })

    expect(await screen.findByText('System name is required')).toBeInTheDocument();
    expect(await screen.findByText('Device type is required')).toBeInTheDocument();
    expect(await screen.findByText('Valid HDD capacity is required')).toBeInTheDocument();
  });

  it('displays validation error when form is submitted with invalid HDD capacity (e.g. 0 or negative)', async () => {
    render(<AddDeviceModal />);

    await act(async () => {
      await userEvent.type(screen.getByTestId('system-name-input'), 'Test Device');
      await userEvent.type(screen.getByTestId('hdd-capacity-input'), '0');
      await userEvent.click(screen.getByTestId('submit-button'));
    });

    expect(await screen.findByText('Valid HDD capacity is required')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<AddDeviceModal />);

    await act(async () => {
      await userEvent.type(screen.getByTestId('system-name-input'), 'Test Device');
      await userEvent.type(screen.getByTestId('hdd-capacity-input'), '500');
    });

    const combobox = screen.getByRole('combobox', { name: /aria-device-type-select/i });
    await act(async () => {
      await userEvent.click(combobox);
    });

    const windowsItem = await screen.findByTestId('WINDOWS');
    await act(async () => {
      await userEvent.click(windowsItem);
    });


    await act(async () => {
      await userEvent.click(screen.getByTestId('submit-button'));
    });

    expect(mockAddDevice).toHaveBeenCalledWith({
      system_name: 'Test Device',
      type: 'WINDOWS',
      hdd_capacity: '500',
    });
  });

  it('closes the modal when clicking on the close button', async () => {
    render(<AddDeviceModal />);

    const closeButton = screen.getByTestId('close-button');
    await act(async () => {
      await userEvent.click(closeButton);
    })

    expect(mockSetIsAddDeviceModalOpen).toHaveBeenCalledWith(false);
  });
});
