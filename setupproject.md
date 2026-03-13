# Project Setup Guide

This guide will help you set up the KrushiSense – Crop Recommendation System on your local device after extracting the project zip.

---

## 1. Extract the Project
- Unzip the project archive to your desired location.

## 2. Python Backend Setup

### a. Create and Activate Virtual Environment
- Open a terminal in the project root folder.
- Run:
  ```sh
  python -m venv .venv
  # On Windows:
  .venv\Scripts\activate
  # On macOS/Linux:
  source .venv/bin/activate
  ```

### b. Install Python Dependencies
- Run:
  ```sh
  pip install -r requirements.txt
  ```

### c. Apply Django Migrations
- Navigate to the backend folder:
  ```sh
  cd backend
  ```
- Run:
  ```sh
  python manage.py migrate
  ```

### d. Start Django Server
- Run:
  ```sh
  python manage.py runserver
  ```
- The backend will be available at [http://localhost:8000](http://localhost:8000)

---

## 3. Frontend Setup (React + TypeScript)

### a. Install Node.js
- Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) if not already installed.

### b. Install Frontend Dependencies
- Open a new terminal in the `frontend` folder:
  ```sh
  cd frontend
  npm install
  ```

### c. Start Frontend Server
- Run:
  ```sh
  npm run dev
  ```
- The frontend will be available at [http://localhost:5173](http://localhost:5173)

---

## 4. Access the Application
- Open your browser and go to [http://localhost:5173](http://localhost:5173)
- Use the input wizard to get crop recommendations.

---

## Troubleshooting
- Ensure Python and Node.js are installed and added to PATH.
- If you encounter errors, check that all dependencies are installed.
- For environment variables, create a `.env` file if needed.

---

## Notes
- Only source code, configuration files, and assets are tracked in Git.
- Do not delete important files like `requirements.txt`, `package.json`, or source folders.

---

Enjoy using KrushiSense!
