# Deploy Express API on Hostinger Node.js Web App

Use this for the Prosperi5 API (`server/` folder): jobs, blog posts, FAQs, and media BLOBs.

## 0. Prerequisites

1. Hostinger plan that supports **Node.js Web App** (not PHP-only shared hosting).
2. MySQL database created in hPanel.
3. In **phpMyAdmin**, run:
   - `sql/ALL_DDL.sql` (recommended — all tables)
   - or `001_schema.sql` then `003_blog_schema.sql`
   - optional: `002_seed_jobs.sql`
4. Know your frontend domain (for CORS), e.g. `https://www.prosperi5.com`.

## 1. Create Node.js Web App (hPanel)

1. hPanel → **Websites** → **Add Website** / **Node.js**.
2. Choose **Node.js 20** (or 18+).
3. Configure:

| Setting | Value |
|---|---|
| Application root | Directory where you will upload `server/` contents |
| Startup file | `index.js` |
| Application URL | e.g. `https://api.yourdomain.com` or Hostinger default URL |

## 2. Upload files

Upload **only the contents of** local `server/` into the Node app root:

```text
/
  index.js          ← required startup file
  package.json
  package-lock.json
  src/
  sql/
  .env              ← optional (prefer hPanel env vars)
```

Do **not** upload:

- React frontend (`src/` of the Vite app)
- `node_modules` (Hostinger will install)
- local secrets you don’t want on the server (set env in hPanel)

Upload via **File Manager**, **FTP**, or **Git** (if enabled).

## 3. Environment variables (hPanel)

Node.js app → **Environment Variables** (preferred over `.env` file):

```text
NODE_ENV=production
HOST=0.0.0.0
APP_URL=https://YOUR-NODE-APP-URL
CORS_ORIGINS=https://www.yourfrontend.com,https://yourfrontend.com
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_mysql_database
JWT_SECRET=paste-a-long-random-string-at-least-32-chars
JWT_EXPIRES_IN=8h
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourStrongPasswordHere
ADMIN_NAME=Prosperi5 Admin
```

Important:

- **Do not set `PORT`** — Hostinger injects it.
- `APP_URL` must be the **public API URL** (no trailing slash). Blog/TinyMCE image URLs depend on this.
- `CORS_ORIGINS` must match your frontend exactly (`https`, no trailing slash).
- If `DB_HOST=localhost` fails, use the host from **hPanel → Databases**.

## 4. Install & start

In the Node.js panel:

1. **Install** dependencies (`npm install`).
2. **Start** / **Restart** the app (`npm start` → `node index.js`).
3. Open logs if it fails.

## 5. Create admin user

With SSH / Node terminal:

```bash
npm run seed:admin
```

Without terminal:

1. hPanel → Databases → enable **Remote MySQL** for your PC IP.
2. On your PC, in `server/.env`, point `DB_*` at Hostinger.
3. Run `npm run seed:admin`.
4. Disable remote MySQL after.

## 6. Verify API

Open these URLs:

| URL | Expected |
|---|---|
| `https://YOUR-API-URL/api/health` | `{ "success": true, ... }` |
| `https://YOUR-API-URL/api/jobs` | JSON jobs list |
| `https://YOUR-API-URL/api/posts` | JSON blog posts |

Admin UI is **not** on the API — use the React site:

`https://YOUR-FRONTEND-URL/#careers-admin`

## 7. Connect frontend (required)

In the **React** project production env / build:

```env
VITE_API_URL=https://YOUR-API-URL/api
VITE_TINYMCE_API_KEY=your-tinymce-key
```

Then rebuild and redeploy the frontend:

```bash
npm run build
```

Until you do this, the live website will not talk to the Hostinger API.

## MySQL / image notes (blog media)

- Images are stored in `media_assets.data` (`LONGBLOB`).
- Max upload size in API: **5MB**.
- Ensure Hostinger MySQL `max_allowed_packet` is large enough (usually fine for 5MB; if uploads fail, ask Hostinger support to raise it).

## Common issues

| Symptom | Fix |
|---|---|
| App won’t start | Startup file = `index.js`; check logs for missing env (`JWT_SECRET`, `DB_*`) |
| DB connection error | `DB_HOST=localhost`, correct user/password/db; user must have privileges |
| CORS blocked | Add exact frontend origin to `CORS_ORIGINS` |
| Images broken in blog | Set correct `APP_URL` to the public API URL, restart app |
| 401 on admin | Run `seed:admin`; use the seeded email/password |
| Frontend empty blog/jobs | Rebuild frontend with `VITE_API_URL` pointing to this API |

## Security checklist

- [ ] Strong unique `JWT_SECRET` (32+ chars)
- [ ] Strong admin password
- [ ] `NODE_ENV=production`
- [ ] `CORS_ORIGINS` only your real domains
- [ ] Optional: remove `ADMIN_PASSWORD` from env after seeding
