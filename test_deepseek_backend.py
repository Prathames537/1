import requests

BACKEND_URL = "http://localhost:8000/chat"

def test_chat():
    payload = {
        "inputs": "What is the difference between Type 1 and Type 2 diabetes?",
        "parameters": {}
    }
    response = requests.post(BACKEND_URL, json=payload)
    print("Status code:", response.status_code)
    print("Response:", response.json())

if __name__ == "__main__":
    test_chat() 