# Project (Client + Server)

```
project/
├── client/     # React (Vite) frontend
└── server/     # Node.js + Express + MongoDB backend
```

## Note

Only the client's config files (package.json, vite.config.js, eslint.config.js,
index.html, .gitignore) were provided/uploaded — there's no `src/` folder yet.
Add your React source files under `client/src/` (e.g. `main.jsx`, `App.jsx`).

## Running both

**Server:**
```
cd server
npm install
cp .env.example .env   # set MONGO_URI
npm run dev
```
Runs on `http://localhost:5000`.

**Client:**
```
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173` (Vite default), and is already whitelisted in
the server's CORS config via `CLIENT_URL` in `server/.env`.

See `client/README.md` and `server/README.md` for details on each.
