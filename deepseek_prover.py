import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env if present (for local dev)
load_dotenv()

HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-Prover-V2-671B"


def query_deepseek_prover(prompt, api_key=None, max_new_tokens=512, temperature=0.7):
    """
    Sends a prompt to the DeepSeek-Prover-V2-671B model via Hugging Face Inference API.

    Args:
        prompt (str): The user input or document to analyze.
        api_key (str): Your Hugging Face API key. If None, will try various env variables.
        max_new_tokens (int): Maximum number of tokens to generate.
        temperature (float): Sampling temperature.

    Returns:
        str: The model's response.

    Raises:
        Exception: If the API call fails or rate limit is hit.
    """
    if api_key is None:
        # Try multiple possible environment variable names
        api_key = (os.getenv("VITE_HF_API_KEY") or 
                  os.getenv("HF_API_KEY") or 
                  os.getenv("HUGGINGFACE_API_KEY") or
                  os.getenv("NEXT_PUBLIC_HF_API_KEY"))
                  
    if not api_key:
        envs_checked = [
            f"HF_API_KEY={os.getenv('HF_API_KEY')}",
            f"HUGGINGFACE_API_KEY={os.getenv('HUGGINGFACE_API_KEY')}",
            f"VITE_HF_API_KEY={os.getenv('VITE_HF_API_KEY')}",
            f"NEXT_PUBLIC_HF_API_KEY={os.getenv('NEXT_PUBLIC_HF_API_KEY')}"
        ]
        debug_info = " | ".join(envs_checked)
        raise ValueError(f"Hugging Face API key not provided. Please set one of these environment variables: VITE_HF_API_KEY, HF_API_KEY, or HUGGINGFACE_API_KEY. [DEBUG ENV] {debug_info}")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": max_new_tokens,
            "temperature": temperature
        }
    }

    try:
        response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        # The response is usually a list of dicts with 'generated_text'
        if isinstance(data, list) and "generated_text" in data[0]:
            return data[0]["generated_text"]
        elif "error" in data:
            raise Exception(f"API Error: {data['error']}")
        else:
            raise Exception("Unexpected API response format.")
    except requests.exceptions.HTTPError as e:
        if response.status_code == 429:
            raise Exception("Rate limit exceeded. Please try again later.") from e
        else:
            raise Exception(f"HTTP error: {e} - {response.text}") from e
    except requests.exceptions.RequestException as e:
        raise Exception(f"Request failed: {e}") from e


if __name__ == "__main__":
    # Example: Analyze a document
    document = """
    The patient is a 45-year-old male presenting with chest pain and shortness of breath.\nPast medical history includes hypertension and diabetes.\nWhat is the likely diagnosis and recommended next steps?
    """
    try:
        result = query_deepseek_prover(document)
        print("Model response:\n", result)
    except Exception as e:
        print("Error:", e)

    # Example: Chat with a user
    user_message = "Can you explain the difference between Type 1 and Type 2 diabetes?"
    try:
        reply = query_deepseek_prover(user_message)
        print("AI:", reply)
    except Exception as e:
        print("Error:", e) 