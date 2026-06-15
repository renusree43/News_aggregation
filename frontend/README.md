SDC Frontend

This is a minimal Vite + React frontend that shows a landing page with an auth form.

Quick start:

1. Install dependencies:

```bash
cd frontend
npm.cmd install
```

2. Run dev server:

```bash
npm.cmd run dev
```

By default the frontend will POST to `http://localhost:8000/api/auth/register` and `/api/auth/login` through the FastAPI gateway.
Set `VITE_API_BASE` env var to change the backend base URL.
