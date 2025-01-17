import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeviceFilterBar from './DeviceFilterBar';
import { useDevices } from '../../context/DeviceContext';
import { DEVICE_TYPE_OPTIONS, SORT_OPTIONS } from '../shared/constants';

jest.mock('../../context/DeviceContext', () => ({
  useDevices: jest.fn(),
}));

describe('DeviceFilterBar Component', () => {
  let mockDebouncedSetSearch;
  let mockSetDeviceTypes;
  let mockSetSortBy;
  let mockFetchDevices;

  beforeEach(() => {
    mockDebouncedSetSearch = jest.fn();
    mockSetDeviceTypes = jest.fn();
    mockSetSortBy = jest.fn();
    mockFetchDevices = jest.fn();

    useDevices.mockReturnValue({
      debouncedSetSearch: mockDebouncedSetSearch,
      deviceTypes: [],
      setDeviceTypes: mockSetDeviceTypes,
      sortBy: '',
      setSortBy: mockSetSortBy,
      fetchDevices: mockFetchDevices,
    });
  });

  it('renders the filter bar with search, device type, and sort inputs', () => {
    render(<DeviceFilterBar />);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Device Type: All')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh/i })).toBeInTheDocument();
  });

  it('calls debouncedSetSearch when typing in the search field', () => {
    render(<DeviceFilterBar />);

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(mockDebouncedSetSearch).toHaveBeenCalledWith('test search');
  });

  it('updates device types when selecting options from the autocomplete', () => {
    render(<DeviceFilterBar />);

    const autocompleteInput = screen.getByPlaceholderText('Device Type: All');
    fireEvent.mouseDown(autocompleteInput);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[0]);

    expect(mockSetDeviceTypes).toHaveBeenCalledWith([DEVICE_TYPE_OPTIONS[0].value]);
  });

  it('updates the sort option when a new sort type is selected', () => {
    render(<DeviceFilterBar />);
    screen.debug();

    const sortSelect = screen.getByLabelText(/sort-select/i);
    fireEvent.mouseDown(sortSelect);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[1]);

    expect(mockSetSortBy).toHaveBeenCalledWith(SORT_OPTIONS[1].value);
  });

  it('calls fetchDevices when the refresh button is clicked', () => {
    render(<DeviceFilterBar />);

    const refreshButton = screen.getByRole('button', { name: /refresh/i });
    fireEvent.click(refreshButton);

    expect(mockFetchDevices).toHaveBeenCalled();
  });
});
