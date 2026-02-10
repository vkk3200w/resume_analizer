import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
# If no API key is found, we will mock the response for demonstration purposes
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key) if api_key else None

def call_llm(prompt_template: str, **kwargs) -> dict:
    """
    Calls the LLM with a prompt template and arguments.
    """
    if not client:
        # User doesn't have an API key set up. Return a mock response or error.
        # For this demo, we'll try to simulate based on the prompt name if possible,
        # but realistically we need an API key. 
        # We will return a dummy error structure that the frontend can handle,
        # or better, purely mock data if it helps the user see the UI.
        
        # However, the user requested a PRODUCTION READY system.
        # So we should assume the key will be provided.
        print("WARNING: No OpenAI API Key found. LLM calls will fail or return mock data.")
        return {"error": "OpenAI API Key not configured."}

    # Construct the prompt
    try:
        prompt_path = os.path.join("prompts", prompt_template)
        with open(prompt_path, "r") as f:
            template = f.read()
            
        formatted_prompt = template.format(**kwargs)
        
        response = client.chat.completions.create(
            model="gpt-4o", # Or gpt-3.5-turbo
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant that always returns valid JSON."},
                {"role": "user", "content": formatted_prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        content = response.choices[0].message.content
        return json.loads(content)

    except Exception as e:
        print(f"LLM Error: {e}")
        return {"error": str(e)}

def mock_llm_response(prompt_template: str) -> dict:
    """
    Returns mock data for testing UI without burning tokens.
    """
    # ... implementation for mock data could go here ...
    pass
