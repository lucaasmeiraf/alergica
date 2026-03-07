# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## Backend & News API

A lightweight FastAPI backend lives in `backend/`. It exposes a `/news` GET
endpoint that fetches APLV-related articles from NewsAPI using the key stored in
an environment variable on the server. This keeps `NEWS_API_KEY` off the client
bundle and avoids CORS issues.

### Running the backend

```bash
cd backend
python -m venv .venv        # or use your preferred env tool
pip install -r requirements.txt
export NEWS_API_KEY="..."   # on Windows use PowerShell: $env:NEWS_API_KEY="..."
uvicorn app.main:app --reload
```

After starting the server, the frontend (at `http://localhost:8080` by default)
will call `http://localhost:8000/news`. The base URL is configurable via the
`VITE_BACKEND_URL` variable in `.env`.

If you'd rather keep the news-fetching logic inside Supabase (so the client
never touches the NewsAPI key), restore the original implementation of
`fetchNews` in `APLVInfoCarousel.tsx` and deploy the `supabase/functions`
handler; the frontend will simply call that function instead of the local
backend.

