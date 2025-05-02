from fastapi import FastAPI, HTTPException
import uvicorn
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.AIChatbot import chatbot
from app.api.routes.SentimentAnalysis import sentiment

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5050",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chatbot.router, prefix="/api/v1/chatbot", tags=["chatbot"])
app.include_router(sentiment.router, prefix="/api/v1/news", tags=["sentiment"]) 


@app.get("/")
def root():
    return {"message":"Welcome to FinTechForge Python Backend","status":"Ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)