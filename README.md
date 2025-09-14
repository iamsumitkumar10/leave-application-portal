# Fullstack Leave Management System

This project is a simple leave management system with **React (frontend)** and **Node.js/Express (backend)**.

---

## 📂 Project Structure

```
project-root/
│── backend/       # Node.js + Express + MongoDB (API server)
│── frontend/      # React app (UI)
│── README.md
```

---

## 🚀 Features
- User authentication (register/login).
- Role-based access (Employee / Admin).
- Employees can request leaves.
- Admins can approve/reject leave requests.
- Protected routes.

---

## 🔧 Prerequisites
- [Node.js](https://nodejs.org/) (>=14)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud like MongoDB Atlas)

---

## ⚙️ Backend Setup (Node.js + Express)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `backend/` with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Run the server:
   ```bash
   npm start
   ```
   Backend runs at: **http://localhost:5000**

---

## 🎨 Frontend Setup (React)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside `frontend/` with:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Run the React app:
   ```bash
   npm start
   ```
   Frontend runs at: **http://localhost:3000**

---

## 🔑 Login Roles
- **Employee** → can request leaves.  
- **Admin** → can approve/reject leaves.  

When registering, select the correct role.  
- Admins are redirected to the **Admin Panel**.  
- Employees are redirected to the **Dashboard**.  

---

## 📦 Build & Deploy
### Build frontend:
```bash
cd frontend
npm run build
```
### Run backend in production:
```bash
cd backend
npm run start
```

---

## 🛠 API Endpoints
- `POST /auth/register` → Register new user  
- `POST /auth/login` → Login user  
- `GET /leaves` → Get all leave requests (admin only)  
- `POST /leaves` → Create leave request (employee)  
- `PUT /leaves/:id/approve` → Approve leave (admin)  
- `PUT /leaves/:id/reject` → Reject leave (admin)  

---

## ✅ How to Use
1. Start **MongoDB**.  
2. Run **backend** → API available at `http://localhost:5000`.  
3. Run **frontend** → UI available at `http://localhost:3000`.  
4. Register as Employee/Admin, then log in and explore features.  

