import requests
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from crud import (
    get_supplier_compliance_history,
)  # Assuming you have a function to fetch compliance history
from schemas import InsightsResponse
from database import get_db

router = APIRouter()

# Groq API URL
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = "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"  # Replace with your Groq API key

# Define headers for authentication
headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json",
}


def get_groq_insights(prompt: str) -> str:
    # Construct the data payload for Groq API
    payload = {
        "model": "llama-3.3-70b-versatile",  # Specify the correct model
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 100,  # Adjust token limit based on your requirement
    }

    try:
        # Send a POST request to the Groq API
        response = requests.post(GROQ_API_URL, json=payload, headers=headers)
        response.raise_for_status()  # Raises an exception for HTTP errors

        # Extract insights from the API response
        insights = response.json()
        return (
            insights.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "No insights generated.")
        )
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"


@router.get("/suppliers/{supplier_id}/insights", response_model=InsightsResponse)
def get_insights(supplier_id: int, db: Session = Depends(get_db)):
    # Fetch compliance history for the given supplier (you'll need to implement this logic)
    supplier_compliance_history = get_supplier_compliance_history(db, supplier_id)

    # Customize the prompt to include specific details about the supplier's compliance history
    prompt = f"Generate insights for supplier {supplier_id}'s compliance history: {supplier_compliance_history}. Suggest contract adjustments based on this history."

    # Use the Groq API to generate insights
    insights = get_groq_insights(prompt)

    # Return the insights in the expected format
    return {"insights": insights}
