# React Accessibility Checker

## Overview

This project is a React-based web application that allows users to upload HTML files for accessibility analysis. It detects issues based on WCAG principles and provides suggested fixes.

## Features

- Upload and analyze HTML files
- Detect accessibility issues such as:
  - Missing alt attributes on images
  - Skipped heading levels
  - Empty links
  - Missing form labels
  - Low contrast text
  - Missing ARIA roles on interactive elements
- View compliance score and issue reports

## Getting Started

### Prerequisites

Ensure you have Node.js (>=14) and npm installed on your system.

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Thegeektets/react-accessibility-checker.git
   cd react-accessibility-checker
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Application

To start the development server:

```sh
npm start
```

This will launch the application at `http://localhost:3000/`.

### Running Tests

```sh
npm test
```

### Building for Production

```sh
npm run build
```

The build output will be in the `build/` directory.

## API Integration

This React frontend interacts with a Node.js backend that processes HTML files for accessibility compliance. Ensure the backend is running before performing analyses.

## Deployment

To deploy the application, use services like Vercel, Netlify, or Firebase:

```sh
npm run build
```

Upload the `build/` directory to your chosen hosting provider.

## License

This project is licensed under the MIT License.
