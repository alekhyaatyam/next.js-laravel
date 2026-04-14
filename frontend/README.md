# Next.js frontend

This folder contains a small Next.js app that talks to the Laravel API in the
project root.

## Run it

1. Start Laravel from the project root:

   ```bash
   php artisan serve
   ```

2. Install frontend dependencies inside `frontend`:

   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` if you need a different API URL.

4. Start Next.js:

   ```bash
   npm run dev
   ```

The frontend expects the Laravel API to be available at
`http://127.0.0.1:8000/api` unless `NEXT_PUBLIC_API_BASE_URL` is overridden.
