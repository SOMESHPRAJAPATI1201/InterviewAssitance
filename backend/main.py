from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

class Prompt(BaseModel):
    text: str

@app.post("/ask-gemini")
async def ask_gemini(payload: Prompt):
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(payload.text)
    return {"reply": response.text}
