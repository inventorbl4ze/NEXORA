# NEXORA

A public AI assistant starter built with a static frontend and Cloudflare Workers.

## Current capabilities
- Responsive public chat interface
- Worker API routes at `/api/health` and `/api/chat`
- Optional Cloudflare Workers AI integration through the `AI` binding
- Static asset serving through Cloudflare Workers Assets

## Not yet connected
Google services are not connected yet. Each integration needs its own official Google API setup, OAuth consent, scopes, and (for some Google Chat development paths) an eligible Google Workspace account. This starter does not access Gmail, Drive, Calendar, or other private account data.

## Deploy
1. Open the Cloudflare dashboard and create a Worker from this repository, or deploy with Wrangler.
2. Ensure the project uses `wrangler.toml`.
3. Confirm Workers AI is available and enable the `AI` binding.
4. Deploy and test `/api/health`.
5. Send a test message in the public chat interface.

Never put API tokens, OAuth client secrets, or passwords in frontend files or commit them to GitHub. Use Cloudflare secrets for credentials.

## Files
- `public/index.html` — frontend
- `src/worker.js` — Worker API and AI integration
- `wrangler.toml` — deployment configuration

Creator credit in the interface: Oduyebo Abiola.
