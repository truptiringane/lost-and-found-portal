# Server (Node.js + Express + MongoDB)

Backend API for the React (Vite) client.

## Setup

1. Install dependencies:
   ```
   cd server
   npm install
   ```

2. Copy `.env.example` to `.env` and update values:
   ```
   cp .env.example .env
   ```
   - `MONGO_URI` — your MongoDB connection string (local or Atlas)
   - `CLIENT_URL` — your React dev server URL (Vite default: `http://localhost:5173`)

3. Start MongoDB locally, or use MongoDB Atlas and paste its connection string into `MONGO_URI`.

4. Run the server:
   ```
   npm run dev
   ```
   Server starts on `http://localhost:5000` (or your `PORT`).

## Structure (flat)

```
server/
├── server.js            # App entry point
├── db.js                # MongoDB connection
├── Item.model.js         # Sample Mongoose schema — rename/extend for your data
├── itemController.js     # CRUD logic
├── itemRoutes.js         # /api/items endpoints
├── errorHandler.js       # 404 + error handling
├── package.json
└── .env.example
```

## API Endpoints (sample "Item" resource)

| Method | Route            | Description       |
|--------|-------------------|--------------------|
| GET    | /api/items        | Get all items      |
| GET    | /api/items/:id    | Get one item       |
| POST   | /api/items        | Create item        |
| PUT    | /api/items/:id    | Update item        |
| DELETE | /api/items/:id    | Delete item        |
| GET    | /api/health       | Health check       |

## Connecting from the React client

In your Vite app, call the API using the base URL `http://localhost:5000/api`, e.g.:

```js
fetch('http://localhost:5000/api/items')
  .then((res) => res.json())
  .then((data) => console.log(data))
```

Rename `Item` → your actual resource (e.g. `User`, `Product`, `Task`) by editing
`Item.model.js`, `itemController.js`, and `itemRoutes.js`, then update the
import/mount in `server.js`.
