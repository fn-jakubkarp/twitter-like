# Frontend Developer Recruitment Task

Welcome! This repository is designed to test your skills as a frontend developer. 
The task involves working with a backend server and creating a simple Twitter-like application on the frontend with full CRUD (Create, Read, Update, Delete) capabilities.

## Repository Structure

The repository contains three main folders:

1. **backend**
2. **frontend**
3. **e2e** NEWLY ADDED

### Backend

The `Backend` folder contains a simple JSON server which will serve as an example API. 
This server allows you to perform CRUD operations on posts or any other structures you may need. 
To get the backend running, follow these steps:

1. **Navigate to the Backend Folder**:
    ```bash
    cd backend
    ```

2. **Install Dependencies**:
    ```bash
    yarn install
    ```

3. **Start the JSON Server**:
    ```bash
    yarn dev
    ```

   The server will run on `http://localhost:3000` and provide endpoints for CRUD operations on posts.

### Frontend

The `Frontend` folder contains a simple Twitter-like application:

1. **Install Dependencies**:
    - Navigate to the `Frontend` folder and install the required dependencies.
    ```bash
    cd frontend
    yarn install
    ```

2. **Start the Frontend Server**:
    ```bash
    yarn start
    ```

   The application should run on `http://localhost:8081` or another port specified by your configuration.

### E2E

The `E2E` folder is where end-to-end test is stored. 

1. **Install Dependencies**:
    - Navigate to the `Frontend` folder and install the required dependencies.
    ```bash
    cd e2e
    yarn install
    ```

2. **Start the tests**:
    ```bash
    yarn e2e
    or
    yarn e2e:ui
    ```
