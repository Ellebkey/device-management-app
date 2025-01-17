# Device Management Application Documentation

## Architecture Overview

The application follows a component-based architecture using React and implements the Context API for state management. It's built with Material-UI components and uses Tailwind CSS for styling.

## Core Components

### MainContainer
The root component that organizes the application structure:
- Implements DeviceProvider for global state
- Manages layout and component organization
- Handles modal components

### Device Management Components

#### DeviceList
Main component for displaying devices:
- Displays devices in a card layout
- Implements device actions (edit/delete)
- Handles loading and error states
- Supports device filtering and sorting

#### AddDeviceModal
Modal component for device creation and editing:
```javascript
// Key features
- Form validation
- System name input
- Device type selection
- HDD capacity input
- Create/Update functionality
```

#### DeleteDeviceModal
Confirmation dialog for device deletion:
- Displays confirmation message
- Shows device name
- Handles deletion process

#### DeviceFilterBar
Component for filtering and sorting:
- Search functionality with debouncing
- Device type filtering
- Sort options implementation
- Refresh capability

## State Management

### DeviceContext
Centralized state management using React Context:

```javascript
// Key state elements
{
  devices: [], // List of devices
  loading: boolean,
  error: string | null,
  currentDevice: object | null,
  searchTerm: string,
  deviceTypes: string[],
  sortBy: string
}

// Main functions
- fetchDevices()
- addDevice(deviceData)
- updateDevice(deviceId, data)
- deleteDevice(deviceId)
```

### Filter and Sort Implementation

#### Search
- Debounced search implementation
- Case-insensitive system name search
- Real-time filtering

#### Device Type Filter
Available options:
- Windows
- Mac
- Linux

#### Sort Options
```javascript
const SORT_OPTIONS = [
  { label: 'HDD Capacity (Descending)', value:'hdd-desc' },
  { label: 'HDD Capacity (Ascending)', value:'hdd-asc' },
  { label: 'System Name (A-Z)', value:'name-asc' },
  { label: 'System Name (Z-A)', value:'name-desc' }
];
```

## API Integration

### Configuration
```javascript
const BASE_URL = 'http://localhost:3001/';
const config = {
  timeout: 5000,
  headers: {
    'content-type': 'application/json'
  }
};
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /devices | Fetch all devices |
| POST   | /devices | Create new device |
| PUT    | /devices/:id | Update device |
| DELETE | /devices/:id | Delete device |
