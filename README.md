# AI Career Copilot

A Full-Stack app that analyzes resumes, answers follow-up career questions and suggests placement opportunities.

## Prerequisites

- Git
- Python 3.10+ (3.11 recommended)
- Node.js 18+ and npm

## 1) Clone Repository

```bash
git clone https://github.com/harshydv99/ai-career-copilot
cd ai-career-copilot
```

## 2) Backend Setup (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn pydantic python-dotenv openai pdfplumber
```

Create a `.env` file in `backend/` with your OpenRouter API key:

```bash
cat <<'ENV_EOF' > .env
OPENROUTER_API_KEY=your_openrouter_api_key_here
ENV_EOF
```

Start the API server:

```bash
uvicorn app:app --host 127.0.0.0 --port 8000
```

The backend will be available at `http://localhost:8000` and FastAPI endpoints can be checked at `http:localhost:8000/docs`

## 3) Frontend Setup (Vite)

Open a new terminal, then:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:8080` by default.

## 4) Verify App

1. Make sure the backend is running on `http://localhost:8000`.
2. Open the frontend in your browser.
3. Upload a PDF resume to see the analysis.
4. Try the “Ask Your Doubts” section and placement suggestions.

## API endpoints (for reference)

- `POST /analyze-resume` — Upload a PDF (`file` form-data)
- `POST /ask-doubt` — JSON body: `{ "question": "...", "analysis": { ... } }`
- `POST /placements` — JSON body: `{ "analysis": { ... } }`

## Common issues

- If the backend fails to start, confirm the virtual environment is active and dependencies are installed.
- If you see CORS issues, confirm the backend is running and reachable at `http://localhost:8000`.
- If the API returns auth errors, verify `OPENROUTER_API_KEY` in `backend/.env`.

## Scripts

Frontend:
- `npm run dev` — Start the dev server
- `npm run build` — Build for production
- `npm run test` — Run tests

Backend:
- `uvicorn app:app --reload` — Start the API server
