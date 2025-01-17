# Device Management Application (NinjaOne)

A React-based web application for managing devices including creation, editing, deletion, filtering, and sorting capabilities.

## Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)
- A running backend server (default: http://localhost:3000)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd device-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure api:
- Check `src/providers/api.js` for API configuration
- Default API URL is http://localhost:3000/

4. Start the development server:
```bash
npm start
```

The application should now be running at http://localhost:3001

## Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Project Structure

```
src/
├── components/    # React components
├── context/       # Context providers
├── providers/     # API and service providers
public/
└── assets/        # Static assets
```

## Features

- Device Management (Create, Read, Update, Delete)
- Search and Filter Capabilities
- Sorting Options
- Real-time Updates
