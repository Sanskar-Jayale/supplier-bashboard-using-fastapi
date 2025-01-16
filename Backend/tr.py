import requests

# Define the Groq API URL and headers
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = "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"  # Replace with your actual Groq API key

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {GROQ_API_KEY}",
}


def get_groq_insights(messages: list) -> str:
    # Construct the data payload for the Groq API
    payload = {
        "messages": messages,
        "model": "llama-3.3-70b-versatile",  # Specify the model you want to use
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": True,  # If you want streaming responses (for large models, set it to True)
        "stop": None,  # You can specify stop tokens if needed
    }

    try:
        # Send a POST request to the Groq API
        response = requests.post(GROQ_API_URL, json=payload, headers=headers)
        response.raise_for_status()  # Raises an exception for HTTP errors

        # Extract the insights from the response
        insights = response.json()
        return (
            insights.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "No insights generated.")
        )
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"
