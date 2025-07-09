from fastapi import FastAPI, Request, Response , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.router import emotion_router, webhook


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(emotion_router.emotion_router, prefix="/emotion")
app.include_router(webhook.router, prefix="/webhook")

