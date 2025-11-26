# GEMINI.md

## Project Overview

This is a web application for managing Petty Cash. It is built with React, TypeScript, and Vite. It uses Tailwind CSS for styling and Chart.js for data visualization. The application uses a custom authentication system and a state-based routing mechanism. It appears to be designed to work with a Supabase backend for user authentication and data persistence.

## Building and Running

To get the project up and running, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the application in development mode, accessible at `http://localhost:5173` by default.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready files.

4.  **Lint the code:**
    ```bash
    npm run lint
    ```

5.  **Type-check the code:**
    ```bash
    npm run typecheck
    ```

## Development Conventions

*   **Authentication:** The application uses a custom `AuthContext` for authentication. The user's session is persisted in local storage. For development purposes, there's a fallback login with the credentials `admin` and `admin123`.
*   **Routing:** The application uses a state-based routing system controlled by the `activeTab` state in `App.tsx`.
*   **Styling:** The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.js`.
*   **State Management:** The primary state is managed within the `App` component and passed down to child components via props.
*   **Code Quality:** The project is set up with ESLint for linting and TypeScript for type-checking.

## File Structure

*   `src/`: This directory contains all the source code for the application.
*   `src/components/`: This directory contains reusable React components.
*   `src/contexts/`: This directory contains React context providers.
*   `src/pages/`: This directory contains the main pages of the application.
*   `src/types/`: This directory contains TypeScript type definitions.
*   `public/`: This directory contains static assets that are publicly accessible.
*   `dist/`: This directory contains the production-ready build files.
