from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from textblob import TextBlob  # Sentiment analysis

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

# Global chat history (for a single user)
chat_history = [
    {"role": "user", "parts": [{"text": "My name is Nandakishor"}]},
    {"role": "model", "parts": [{"text": "Nice to meet you, Nandakishor!"}]}
]

@app.post("/generate")
async def generate_text(request: PromptRequest):
    try:
        user_input = request.prompt

        # Perform sentiment analysis
        sentiment = TextBlob(user_input).sentiment.polarity  # Ranges from -1 (negative) to +1 (positive)

        # Modify response based on sentiment
        if sentiment < -0.3:  
            sentiment_response = "I sense that you're feeling down. I'm here to help. What's bothering you?"
            chat_history.append({"role": "model", "parts": [{"text": sentiment_response}]})
            return {"response": sentiment_response}
        
        # Append user message to chat history
        chat_history.append({"role": "user", "parts": [{"text": user_input}]})

        # Generate response using Gemini model
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(contents=chat_history)

        # Store AI response in chat history
        chat_history.append({"role": "model", "parts": [{"text": response.text}]})

        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def home():
    return {"message": "Google Gemini API with FastAPI"}
