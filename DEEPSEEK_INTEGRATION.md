# DeepSeek-Prover-V2-671B Integration

This document explains how to set up and use the DeepSeek-Prover-V2-671B AI model in the Welli application.

## Prerequisites

- Python 3.11 (Python 3.14 is NOT compatible with the current FastAPI/Pydantic versions)
- A Hugging Face API key with access to the DeepSeek-Prover-V2-671B model

## Setup Instructions

1. **Create a virtual environment with Python 3.11**
   ```powershell
   py -3.11 -m venv venv311
   ```

2. **Activate the virtual environment**
   ```powershell
   .\venv311\Scripts\activate
   ```

3. **Install required dependencies**
   ```powershell
   pip install fastapi==0.103.2 pydantic==1.10.13 starlette==0.27.0 uvicorn requests python-dotenv
   ```

4. **Set up the Hugging Face API key**
   - Create a `.env` file in the project root
   - Add the following line:
     ```
     VITE_HF_API_KEY=your_huggingface_api_key_here
     ```
   - Replace `your_huggingface_api_key_here` with your actual API key

5. **Start the server**
   ```powershell
   python ai_server.py
   ```

## How It Works

- The DeepSeek-Prover-V2-671B model is accessed through the Hugging Face Inference API.
- The implementation is in `deepseek_prover.py`, which handles the API calls and error handling.
- The FastAPI backend (`ai_server.py`) uses this to provide AI responses through the `/chat` endpoint.
- The frontend makes POST requests to the `/chat` endpoint to get AI responses.

## Testing the Integration

1. **With Python**
   ```python
   import requests
   response = requests.post(
       "http://localhost:8000/chat",
       json={"inputs": "What is Type 1 diabetes?", "parameters": {}}
   )
   print(response.json())
   ```

2. **With the Frontend**
   The ChatBot component is already configured to use the `/chat` endpoint.

## Troubleshooting

- If you see errors related to FastAPI, Pydantic, or type inference, make sure you're using Python 3.11.
- If you get an "API key not provided" error, check that your `.env` file is set up correctly.
- If responses take a long time, this is normal as the DeepSeek model is very large.

## Parameters

You can customize model behavior by modifying the `parameters` in the request:
- `max_new_tokens`: Maximum length of the generated response (default: 512)
- `temperature`: Controls randomness of outputs (default: 0.7, higher = more random)

Example:
```json
{
  "inputs": "Your prompt here",
  "parameters": {
    "max_new_tokens": 1024,
    "temperature": 0.5
  }
}
``` 