from fastapi import APIRouter, Cookie, File, UploadFile, HTTPException,Request
from .helper import get_sentiment_agent
from app.api.middlewares import authUser
from typing import List
import os
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/sentiment")
async def sentiment(url: str):
    try:
        result = get_sentiment_agent(url)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


