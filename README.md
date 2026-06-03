# Resumify Sync

Resumify Sync is a modern resume builder application built with a React + Vite frontend and an Express + MongoDB backend. It lets users register, log in, create, customize, preview, and download professional resumes with live editing, theme controls, image uploads, and full CRUD support.

> This project was developed as a practice app and inspired by the "Time To Program" YouTube channel.

---

## 🚀 Project Overview

Resumify Sync helps users build polished resumes quickly using an intuitive interface and real-time preview.

Key capabilities include:
- User authentication with JWT-based login and registration
- Resume dashboard with create, edit, and delete actions
- Live editor with step-by-step input sections
- Multiple resume templates and color palettes
- Profile image uploads and generated resume thumbnails
- One-click resume export as PDF
- Persistent resume storage in MongoDB

---

## ✨ Main Features

- **User Authentication**: Register, login, and manage user sessions using JWT.
- **Dashboard**: View all saved resumes with resume cards and quick access to editing.
- **Resume Creation**: Add new resumes from the dashboard and begin editing immediately.
- **Live Resume Editor**: Fill sections such as profile, contact, work experience, education, skills, projects, certifications, languages, and interests.
- **Template Switching**: Choose from multiple resume templates with different layouts.
- **Color Palette Selector**: Apply custom palettes to personalize resume styling.
- **PDF Download Support**: Preview and download resume content as a PDF-like export.
- **Save & Edit Resumes**: Persist resumes for later updates.
- **Image Upload & Preview**: Upload profile images and generate resume thumbnails through HTML capture.
- **Backend API Integration**: Full CRUD API built with Express, MongoDB, and Multer.

---

## 🧱 Tech Stack

- Frontend: React, Vite, Tailwind CSS, React Router, React Hot Toast
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- Utilities: Axios, html2canvas, react-to-print, Moment.js

---

## 📁 Repository Structure

- `backend/` — Express server and API implementation
- `frontend/ResumifySync/` — React app and UI components

### Backend
- `server.js` — Express app entrypoint
- `config/db.js` — MongoDB connection
- `controllers/` — Auth, resume, and image upload logic
- `routes/` — Auth and resume API routes
- `models/` — `User` and `Resume` schemas
- `middlewares/` — JWT auth and file upload handling
- `uploads/` — served static folder for image files

### Frontend
- `src/App.jsx` — app routes and global providers
- `src/pages/` — landing page, dashboard, auth, resume editor
- `src/components/` — reusable UI, templates, cards, modals
- `src/context/` — user authentication state provider
- `src/utils/` — API paths, axios instance, helper utilities

---

## 🔧 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following values:

```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The backend runs on `http://localhost:3000` by default.

### 2. Frontend Setup

```bash
cd frontend/ResumifySync
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

> If your backend runs on a different port or host, update `frontend/ResumifySync/src/utils/apiPaths.js` `BASE_URL` accordingly.

---

## 🧠 Application Flow

### Landing Page
The landing page introduces Resumify Sync and lets users sign up or log in.

### Authentication
- **Sign Up**: Create an account and optionally upload a profile image.
- **Login**: Access the dashboard using registered credentials.

### Dashboard
- View all saved resumes
- Create a new resume
- Select a resume card to edit

### Resume Editor
- Edit resume title and content in a multi-step wizard
- Update profile, contact, employment, education, skills, projects, certifications, languages, and interests
- Change resume template and color palette
- Save changes and generate a resume thumbnail
- Preview and download the resume using print/export functionality

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate user credentials
- `GET /api/auth/profile` — Get current user profile
- `POST /api/auth/upload-image` — Upload a profile image

### Resume
- `POST /api/resume` — Create a new resume
- `GET /api/resume` — Fetch all user resumes
- `GET /api/resume/:id` — Fetch resume by ID
- `PUT /api/resume/:id` — Update resume data
- `PUT /api/resume/:id/upload-images` — Upload thumbnail/profile image
- `DELETE /api/resume/:id` — Delete a resume

---

## 💾 Data Model Summary

### User
- `name`
- `email`
- `password`
- `profileImageURL`

### Resume
- `userId`
- `title`
- `thumbnailLink`
- `template` (theme + color palette)
- `profileInfo`
- `contactInfo`
- `workExperience[]`
- `education[]`
- `skills[]`
- `projects[]`
- `certifications[]`
- `languages[]`
- `interests[]`

---

## 🛠️ Notes

- Resume preview is generated live in the editor and can be saved as an image-based PDF export.
- Uploaded images are stored in `backend/uploads/` and served via `/upload/*`.
- The app uses JWT tokens stored in `localStorage` for session state.
- If token validation fails, the frontend redirects to the home page.

---

## 🚧 Future Improvements

Some enhancements you can add later:
- Add password reset and email verification
- Add true PDF generation instead of print capture
- Add more templates and resume section layouts
- Add greater responsiveness for mobile editing
- Add resume sharing, cloning, or publishing links

---

## 💡 Credits

Built by **Seboo** using a project-based learning path inspired by the **Time To Program** channel.

---

## 📄 License

This project is currently licensed under ISC.
