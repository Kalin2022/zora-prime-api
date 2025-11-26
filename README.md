# Zora-Prime API

Microservice that powers every `/api/zora/*` call used by the desktop client. It is a tiny Express server with dynamically loaded route files, and all persistence flows through Supabase using the service role key.

## Getting Started

1. Copy environment template  
   `cp .env.example .env`  
   Fill in:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PORT` (optional – defaults to `3000`)
2. Install dependencies  
   `npm install`
3. Run locally  
   - Hot reload: `npm run dev`  
   - Prod build: `npm run build && npm start`

When the server boots it scans `api/zora/*.ts`, mounts each file as `POST /api/zora/<name>`, and logs the routes that load.

## Example Payloads

```jsonc
POST /api/zora/registerHost
{
  "email": "host@example.com",
  "device_key": "ABC-123",
  "display_name": "Velvet"
}
```

```jsonc
POST /api/zora/heartbeat
{
  "synthId": "synth_01",
  "systemState": { "cpu": 0.42 },
  "emotionalState": { "warmth": 0.61 },
  "recursionDepth": 3,
  "flags": {}
}
```

Every route answers with `{ ok: boolean, data?: any, error?: string }` using the helpers from `_supabase.ts`.

## Required Environment Variables

| Name | Description |
| --- | --- |
| `SUPABASE_URL` | Project URL from Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only) |
| `PORT` | HTTP port (default `3000`) |

## Deploying to Render

1. Create a new **Web Service** on Render.
2. Connect the repository containing `zora-prime-api`.
3. Build command: `npm install && npm run build`
4. Start command: `node dist/server.js`
5. Add environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and optional `PORT`.
6. Click **Deploy**.

Render will run the compiled server from `dist/server.js`, which mirrors the same dynamic route loader and Supabase access pattern used locally.

