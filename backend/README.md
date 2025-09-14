# Leave Application Portal (Backend)

Simple Leave Application Portal built with Node.js, Express and MongoDB (Mongoose).

## Features
- User registration & login (Employee & Admin)
- Employees can apply, view, edit (if pending), and cancel (if pending) their leaves
- Admin can view all leaves and approve/reject
- JWT authentication & role-based access control

## Setup

1. Clone or unzip files
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using `.env.example` and set:
   - `MONGODB_URI` (e.g. mongodb://localhost:27017/leave_portal)
   - `JWT_SECRET`
   - `PORT` (optional)
4. Start the server:
   ```bash
   npm run dev
   ```

## Important Endpoints

- `POST /auth/register` - Register user
  - body: `{ "name","email","password","role" }` role = "employee" or "admin"
- `POST /auth/login` - Login
  - body: `{ "email", "password" }` returns `{ token }`
- `POST /leaves` - Apply for leave (employee) - protected
- `GET /leaves/my` - Get own leaves (employee) - protected
- `PUT /leaves/:id` - Edit own leave (if pending) - protected
- `DELETE /leaves/:id` - Cancel own leave (if pending) - protected
- `GET /leaves` - Admin: get all leaves - admin-protected
- `PUT /leaves/:id/approve` - Admin approve - admin-protected
- `PUT /leaves/:id/reject` - Admin reject - admin-protected

## Notes
- Passwords are hashed with bcrypt.
- JWT token must be sent in `Authorization: Bearer <token>` header.
- This is a backend project; you can test with Postman or build a React frontend later.
