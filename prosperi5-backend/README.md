# PROSPERi5 Careers API

Express + MySQL backend for dynamic careers jobs, with a built-in admin panel.

## 1. Database (Hostinger phpMyAdmin)

1. Open **hPanel → Databases → phpMyAdmin**.
2. Select your database.
3. Open the **SQL** tab and run, in order:
   - `sql/001_schema.sql` (admins + jobs)
   - `sql/003_blog_schema.sql` (media + blogs + FAQs)
   - Or run `sql/ALL_DDL.sql` once (combined)
   - `sql/002_seed_jobs.sql` (optional — seeds sample jobs)

## 2. Configure the API

```bash
cd server
cp .env.example .env
```

Edit `.env` with Hostinger MySQL credentials:

| Variable | Where to find it |
|---|---|
| `DB_HOST` | hPanel → Databases (often `localhost` on same server, or `srvXXXX.hstgr.io` for remote) |
| `DB_USER` / `DB_PASSWORD` / `DB_NAME` | Your MySQL user + database |
| `JWT_SECRET` | Long random string (32+ chars) |
| `CORS_ORIGINS` | Your website origin(s), comma-separated |

If the API runs **outside** Hostinger, enable **Remote MySQL** in hPanel and allow your server IP.

## 3. Install & create admin

```bash
cd server
npm install
npm run seed:admin
npm run dev
```

- API: `http://localhost:4000/api/health`
- React admin: `http://localhost:5173/#careers-admin`

Default admin comes from `.env`:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Change the password after first login in production (re-seed only creates if missing).

## 4. Frontend

In the Vite app root, create `.env`:

```env
VITE_API_URL=http://localhost:4000/api
```

For production:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

Local Vite also proxies `/api` → `http://localhost:4000` (see `vite.config.js`), so you can leave `VITE_API_URL` empty in development.

## API overview

### Public
- `GET /api/health`
- `GET /api/jobs` — published jobs only
- `GET /api/jobs/:idOrSlug`
- `POST /api/applications` — optional application capture

### Admin (Bearer JWT)
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/admin/jobs`
- `POST /api/admin/jobs`
- `PATCH /api/admin/jobs/:id`
- `DELETE /api/admin/jobs/:id` — soft delete

## Hostinger Node.js Web App

Step-by-step: see **[HOSTINGER.md](./HOSTINGER.md)**.

Quick settings:

- Startup file: `index.js`
- Start command: `npm start`
- Bind host: `0.0.0.0` (already configured)
- Use hPanel **Environment Variables** for DB + JWT + CORS
- Frontend production: `VITE_API_URL=https://YOUR-API-URL/api`

## Reliability choices in this design

- Soft deletes (`deleted_at`) so jobs are recoverable
- Draft / published / closed workflow
- UUID primary keys
- JWT auth + rate-limited login
- Zod validation on write endpoints
- Connection pooling via `mysql2`
- Separate public vs admin list endpoints
