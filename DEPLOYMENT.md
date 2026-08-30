# FundBridge AI deployment

FundBridge AI is a Vite/React single-page frontend (`/`) and a TypeScript/Express API (`/backend`). The API uses PostgreSQL through Prisma, JWT bearer tokens for protected routes, and an Ollama-compatible AI endpoint. The frontend calls the API through `VITE_API_URL`; if it is empty, it uses the same origin.

## Build and run

Frontend:

```sh
npm ci
npm run build
```

Serve the generated `dist/` directory with your static host. For a separately deployed API, set `VITE_API_URL` to its public HTTPS origin before building. This is a public value; never place database, JWT, or AI credentials in the frontend environment.

Backend:

```sh
cd backend
npm ci
npm run prisma:migrate:deploy
npm run build
npm start
```

`npm run build` generates Prisma Client before compiling. `npm start` runs `dist/server.js` and binds to the runtime-provided `PORT` (or port 5050 locally). Do not use `prisma migrate dev` in production.

## Required backend environment

Copy `backend/.env.example` for local development and set values in your host's secret manager for production:

| Variable | Purpose |
| --- | --- |
| `NODE_ENV` | Set to `production` in production. |
| `PORT` | Provided by most hosts; optional locally. |
| `DATABASE_URL` | Managed PostgreSQL connection URL; required. |
| `JWT_SECRET` | Long random signing secret; required in production. |
| `FRONTEND_ORIGIN` | Comma-separated exact allowed frontend origins; required in production. |
| `UPLOAD_DIR` | Mounted persistent directory for uploads; required in production. |
| `UPLOAD_PUBLIC_PATH` | URL path for serving the mounted upload directory (default `/uploads`). |
| `OLLAMA_URL` | Reachable Ollama-compatible model endpoint. |
| `OLLAMA_MODEL` | Model name at that endpoint. |
| `AI_REQUEST_TIMEOUT_MS` | Optional AI request timeout in milliseconds. |

Do not use `localhost` or `127.0.0.1` in production for the database or AI service unless that service intentionally runs in the same deployed private network. The included local defaults are development-only examples.

## Database and uploads

Provision a managed PostgreSQL database, set `DATABASE_URL`, then run `npm run prisma:migrate:deploy` once per release. The app exits with a clear missing-`DATABASE_URL` error before accepting traffic.

Document uploads use the filesystem directory in `UPLOAD_DIR`; attach it to durable storage offered by your host (persistent disk/volume) and mount the same directory after redeploys. Local ephemeral server disks will lose documents. Set a non-public path and use a platform access policy appropriate for the documents you store.

## AI and CORS

Host Ollama or an Ollama-compatible service remotely and set its private/reachable URL in `OLLAMA_URL`; it is used only by the backend. If it is unavailable, the application retains its profile-based fallback guidance, but a reachable model is required for generated AI responses. The API only permits the explicit `FRONTEND_ORIGIN` values in production; include the scheme and do not add trailing slashes.

## Verification and troubleshooting

After deploy, request `GET https://your-api.example/health`; it returns `{ "status": "ok" }` without authentication. `GET /api/health` also returns API status. Open the frontend, create an account, complete a profile, then verify funding, document upload on the mounted volume, and AI strategy.

Common failures:

- **CORS error:** add the exact deployed frontend URL to `FRONTEND_ORIGIN` and redeploy the API.
- **Database startup error:** set a valid, reachable `DATABASE_URL` and run `prisma:migrate:deploy`.
- **JWT startup error:** set `JWT_SECRET` in production; changing it invalidates existing sessions.
- **Uploads disappear:** configure a durable `UPLOAD_DIR` mount, not the host's temporary disk.
- **AI fallback response:** verify the backend can reach `OLLAMA_URL` and that `OLLAMA_MODEL` is installed there.

For a GitHub-driven redeploy, push the changes, configure the listed environment variables and persistent volume in the host, then run the backend migration/build/start commands and the frontend build command as part of the release. Re-run the health check and the user flow after each release.
