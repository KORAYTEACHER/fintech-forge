from fastapi import APIRouter, HTTPException,Request
from .helper import finance_chatbot

router = APIRouter()

@router.get("/chat")
async def sentiment(query: str):
    try:
        result = finance_chatbot(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))