# Google Drive Clone

A full-stack application for managing nested folders and images, inspired by Google Drive.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Axios, React Router.
- **Backend**: NodeJS, Express, MongoDB, Mongoose, JWT, Multer.

## Setup Instructions

### 1. Backend Setup
1. Open terminal and navigate to `backend/` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the `backend` directory (Sample provided in `backend/.env`):
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/dobby-drive
   JWT_SECRET=thisismysupersecretjwtkeythatisverysecure
   ```
4. Make sure MongoDB is running locally or provide a MongoDB Atlas URI.
5. Create an `uploads` directory inside `backend`: `mkdir uploads`
6. Start the server: `npm run dev` (Runs on http://localhost:5000)

### 2. Frontend Setup
1. Open a new terminal and navigate to `frontend/` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Deployment Steps

### Backend Deployment (Render / Railway)
1. Push the repository to GitHub.
2. In Render, select **Web Service** and connect the repository.
3. Set the Root Directory to `backend`.
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).
7. **Important for Render**: Since Render resets local changes on redeploy, `uploads/` directory will be cleared if you use local file storage. For a true production app, replace Multer disk storage in `backend/routes/imageRoutes.js` with Cloudinary or AWS S3.

### Frontend Deployment (Vercel / Netlify)
1. In Vercel, import the repository.
2. Set the Root Directory to `frontend`.
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Before deploying, ensure you change `http://localhost:5000/api` in `frontend/src/utils/api.js` and `frontend/src/context/AuthContext.jsx` to your live backend URL.

## Test Credentials
To test the application locally without creating a new account:
- Go to Signup and create an account:
  - **Name**: Test User
  - **Email**: test@dobby.com
  - **Password**: password123

## Features
- Complete Authentication (Signup, Login, Logout)
- Create nested folders with infinite depth
- Upload images to any folder
- Recursive calculation of folder sizes (sum of all images & nested folders)
- User-specific isolated access
- Premium Google Drive inspired glassmorphism UI
