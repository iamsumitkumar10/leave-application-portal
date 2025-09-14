# Leave Portal Frontend (Vite + React)

Quick frontend for the Leave Application Portal backend you already have running at `http://localhost:5000`.

## Setup
1. enter folder.
2. Run `npm install`.
3. Start dev server: `npm start` (opens at http://localhost:5173 by default).

## Notes / Limitations
- The backend's `/auth/login` response returns only a JWT token (no role). To ensure correct role-based UI:
  - When you **register** via this frontend, the chosen role (`employee` or `admin`) is saved in localStorage alongside the token.
  - If you registered previously via the backend or Postman, this frontend won't know the role automatically. In that case, re-register the user using this frontend (or use the backend directly).
- The token is stored in `localStorage.token`. The app uses it to authorize API requests.
