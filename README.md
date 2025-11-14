# Interview Preparation Platform (MERN Stack)

A full-stack MERN-based platform designed to help students practice technical interview questions through question banks, daily challenges, and mock interviews.

---

## 🚀 Live Demo

### Frontend (Vercel)
🔗 https://interview-preparation-zzxr.vercel.app

### Backend (Render)
🔗 https://interview-preparation-fzeo.onrender.com

---

## 📦 Tech Stack

### **Frontend**
- React.js (Vite)
- React Router
- Context API (Auth)
- Axios

### **Backend**
- Node.js
- Express.js
- JWT Authentication
- CORS Protection

### **Database**
- MongoDB Atlas (Mongoose ODM)

### **Deployment**
- **Frontend** → Vercel  
- **Backend** → Render  
- **Database** → MongoDB Atlas  

---

## 📚 Features

### 🔐 **User Authentication**
- Register, login, logout
- JWT-based authentication
- Protected routes

### ❓ **Question Bank**
- List of categorized technical interview questions
- Difficulty filters (Easy, Medium, Hard)
- Tags, hints, examples, solutions

### 🎯 **Daily Challenge**
- Automatic daily question
- Tracks solved questions

### 🎤 **Mock Interview Mode**
- On-screen timer
- Random question generator
- Real interview simulation

### 👤 **User Profile**
- Saved questions
- Progress tracking (basic analytics)
- Account info

---

## 🧩 Project Structure

Interview-Preparation
│── server/ # Backend (Node.js + Express)
│── client/ # Frontend (React + Vite)
│── README.md

yaml
Copy code

---

## 🔧 Backend Setup (Local)

```sh
cd server
npm install
npm run dev
Create a .env file:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
💻 Frontend Setup (Local)
sh
Copy code
cd client
npm install
npm run dev
Create a .env file:

ini
Copy code
VITE_API_URL=http://localhost:5000
🚀 Deployment Steps
Backend (Render)
Connect GitHub repo

Root Directory → server

Build Command → npm install

Start Command → npm start

Add Environment Variables:

ini
Copy code
MONGO_URI=your_atlas_uri
JWT_SECRET=your_secret
CLIENT_URL=https://interview-preparation-zzxr.vercel.app
PORT=5000
