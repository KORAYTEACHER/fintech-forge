import asyncio
import os
from typing import List
from pydantic import BaseModel, Field
from rich.pretty import pprint
from dotenv import load_dotenv

from agno.agent import Agent
from agno.models.groq import Groq
from agno.team.team import Team


load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

model = Groq(id="llama-3.3-70b-versatile", api_key=GROQ_API_KEY)

class SentimentAnalysisResult(BaseModel):
    sentiment: str = Field(..., description="Sentiment classification: Bullish, Bearish, or Neutral.")
    reason: str = Field(..., description="Explanation for the sentiment classification.")

def get_sentiment_agent(url: str) -> SentimentAnalysisResult:
    sentiment_agent = Agent(
        tools=[],
        description=(
            "You are a Sentiment Analyzer. You will be given a URL to a news article. "
            "Your task is to analyze the sentiment of the article and classify it as Bullish, Bearish, or Neutral. "
            "Provide a brief explanation for your classification."
        ),
        instructions=[
            "Extract the text from the page and analyze sentiment",
            "Make sure to remove any unnecessary information, such as ads or navigation links.",
            "Format your response using markdown."
        ],
        response_model=SentimentAnalysisResult,
        structured_outputs=True,
        model=model,
        show_tool_calls=True
    )

    result = sentiment_agent.run(f"{url}")
    return result.content

