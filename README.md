# 🌈 MoodMirror

MoodMirror is an **emotion reflection tool** that helps users analyze their emotions based on text input. It uses AI to detect the dominant emotional state, provide confidence scores, and generate a detailed analysis.

This is a full-stack application with:

- 🖥️ **Frontend**: React (Vite) + Tailwind CSS
- 🚀 **Backend**: FastAPI (Python) using `uv` for ultra-fast server execution
- 📦 **Database**: MongoDB (Atlas)
- 🤖 AI Models: Gemini API for emotion analysis

---

## ✨ Features

- 📝 Analyze emotions from user input
- 📊 Confidence scores for detected emotions
- 📖 Detailed explanations of analysis
- 👤 User authentication (via Clerk)
- 📦 REST API backend
- 🌐 Responsive frontend design

---

## 🛠️ Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Frontend       | React (Vite), Tailwind CSS, Shadcn UI |
| Backend        | FastAPI, Python `uv` package          |
| Database       | MongoDB Atlas                         |
| Authentication | Clerk                                 |
| AI             | Gemini API                            |

---

## 📂 Folder Structure

```py
moodmirror/
├── backend/ # FastAPI Backend
│ ├── src/
│ │ ├── app.py # FastAPI entrypoint
│ │ ├── routes/ # API routes
│ │ ├── models/ # Pydantic models
│ │ └── database/ # MongoDB setup
│ ├── requirements.txt
│ └── .env
├── frontend/ # React Frontend
│ ├── src/
│ ├── public/
│ ├── vite.config.js
│ ├── package.json
│ └── .env
├── README.md # Project documentation

```

---

## ⚡ Getting Started

### 🚨 Prerequisites

- Node.js (>= 18)
- Python (>= 3.10)
- MongoDB Atlas account
- Clerk account
- Gemini API Key
- `uv` Python package (`pip install uv`)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ridamsinghal25/Emotion-Reflection-App.git

cd Emotion-Reflection-App
```

### 2️⃣ Setup Backend

Install dependencies

```bash
uv run server.py
```

Create a `.env` file in root of backend and add the following environment variables:

```bash
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>?retryWrites=true&w=majority"

GENAI_API_KEY="gemini-api-key"

CLERK_SECRET_KEY="clerk-secret-key"

JWT_KEY="jwt-secret-key" # Go to Clerk Dashboard -> Configure -> API Keys -> Take JWKS Public Key


CLERK_WEBHOOK_SECRET="clerk-webhook-secret"

CORS_ORIGIN="http://localhost:5173"
```

Run the backend

```bash
uv run server.py
```

FastAPI will start at http://localhost:8000.

### 3️⃣ Setup Frontend

Install dependencies

```bash
cd frontend
npm install
```

Add environment variables

Create a .env file in frontend/:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_SERVER_URL="http://localhost:8000"
```

Run the frontend

```bash
npm run dev
```

Frontend will start at http://localhost:5173.
