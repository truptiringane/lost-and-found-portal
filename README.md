# Lost & Found Portal — Full Stack (React + Node/Express + MongoDB)

A complete Lost & Found web app: a React (Vite) frontend matching the original UI design, wired up
to a real Node/Express + MongoDB backend with authentication, item reports, image uploads, saved
items, and a contact form.

## Project structure

```
lost-and-found-portal/
  src/                  React frontend
    api/client.js        fetch wrapper (adds auth token, resolves image URLs)
    context/AuthContext.jsx   current user, login/register/logout
    components/          Sidebar, DashboardLayout, PublicNavbar, ProtectedRoute, etc.
    pages/                One file per screen
  server/               Node/Express + MongoDB backend
    models/               User, Item, Contact (Mongoose schemas)
    controllers/           Route handlers (auth, users, items, contact)
    routes/                 Express routers
    middleware/             auth.js (JWT), upload.js (image uploads via multer)
    uploads/                 Uploaded images are stored here and served at /uploads/...
    server.js               App entry point
```

## 1. Set up the backend

```bash
cd server
npm install
cp .env.example .env
```

Open `server/.env` and fill in:
- `MONGO_URI` — your MongoDB connection string. Easiest options:
  - **Local MongoDB**: install MongoDB Community Server, then use `mongodb://127.0.0.1:27017/lost-and-found`
  - **MongoDB Atlas** (free cloud DB): create a cluster at mongodb.com/atlas, get your connection string, and use that
- `JWT_SECRET` — any long random string (used to sign login tokens)
- `PORT` — defaults to 5000
- `CLIENT_URL` — defaults to `http://localhost:5173` (your frontend's dev URL, used for CORS)

Start the backend:
```bash
npm run dev
```
You should see:
```
MongoDB connected: ...
Server running on http://localhost:5000
```

Verify it's alive by visiting `http://localhost:5000/api/health` in your browser — it should return `{"status":"ok"}`.

## 2. Set up the frontend

In a **separate terminal**, from the project root:
```bash
npm install
cp .env.example .env
```

`.env` already points `VITE_API_URL` at `http://localhost:5000/api` — that matches the backend
defaults above, so you usually don't need to change it (only edit it if you changed `PORT` in the backend).

Start the frontend:
```bash
npm run dev
```
Open the printed URL (usually `http://localhost:5173`).

## 3. Try it out

1. Go to **Register**, create an account — you'll be logged in automatically and redirected to the Dashboard.
2. Use **Report Lost Item** / **Report Found Item** to submit a report (with photos).
3. Visit **Browse Items** to see all reports from every user, with search/category/location filters.
4. **My Reports** shows only what you've reported (with a delete option).
5. **Saved Items** lets you bookmark items from the item detail page (heart icon) and see them here.
6. **Profile** lets you edit your name/email/phone and change your password.
7. **Contact Us** submits messages to the backend (stored in MongoDB, viewable via your DB client for now — no admin inbox UI yet).

## How the pieces connect

- Auth: `POST /api/auth/register` and `POST /api/auth/login` return a JWT, which the frontend stores
  in `localStorage` (`lf_token`) and attaches to every request as `Authorization: Bearer <token>`.
- `ProtectedRoute` (`src/components/ProtectedRoute.jsx`) redirects to `/login` if there's no logged-in user —
  it wraps Dashboard, Report Lost/Found, My Reports, Saved Items, Notifications, Profile, and Settings.
- Images: report forms upload files via `multipart/form-data` to `POST /api/items` (multer saves them
  to `server/uploads/` and returns paths like `/uploads/xyz.jpg`); the frontend resolves these into full
  URLs with `resolveImage()` in `src/api/client.js`.

## What's stubbed / not wired up yet

- **Notifications** — the page and empty state are built, but there's no notification-generating logic yet
  (e.g. "someone messaged you about your item"). You'd add an "is a match" check when new items are created.
- **Settings** — the notification-preference toggles are local UI state only; add a `preferences` field to
  the `User` model and a `PUT /api/users/me/preferences` endpoint to persist them.
- **Change Photo** on the Profile page — hook up another multer route (e.g. `POST /api/users/me/avatar`)
  the same way report image uploads work.
- **Forgot password** — the link on the Login page is a placeholder; a real flow needs an email service
  (e.g. Nodemailer + a reset-token field on `User`).

## Deploying

- **Backend**: any Node host works (Render, Railway, Fly.io, a VPS). Set the same environment variables
  as `.env`, and point `CLIENT_URL` at your deployed frontend's URL.
- **Frontend**: `npm run build` produces a static `dist/` folder — deploy it to Vercel, Netlify, or any
  static host, and set `VITE_API_URL` (as a build-time env var) to your deployed backend's URL + `/api`.
- **Images**: `server/uploads/` is local disk storage, which doesn't persist on most cloud hosts (files
  get wiped on redeploy). For production, swap the multer disk storage in `server/middleware/upload.js`
  for a cloud storage adapter (e.g. `multer-storage-cloudinary` or an S3 upload).

## Troubleshooting

- **"Failed to fetch" errors in the browser** → the backend isn't running, or `VITE_API_URL` doesn't
  match its port. Check `http://localhost:5000/api/health` loads directly in your browser.
- **CORS errors in the console** → make sure `CLIENT_URL` in `server/.env` matches the exact URL your
  frontend is running on (including port).
- **MongoDB connection errors** → double check `MONGO_URI`. For Atlas, make sure your current IP is
  allow-listed under Network Access in the Atlas dashboard.
- **Images don't show up** → confirm the backend is serving `/uploads` (visit
  `http://localhost:5000/uploads/<filename>` directly) and that `VITE_API_URL` is correct so
  `resolveImage()` builds the right URL.
