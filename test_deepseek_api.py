import requests
import json

# Test the /chat endpoint
def test_chat_endpoint():
    url = "http://localhost:8000/chat"
    headers = {"Content-Type": "application/json"}
    data = {
        "inputs": "What is Type 1 diabetes?",
        "parameters": {}
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        print(f"Status code: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print("Response from AI:")
            print(json.dumps(result, indent=2))
            return True
        else:
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"Exception: {e}")
        return False

if __name__ == "__main__":
    print("Testing DeepSeek-Prover AI integration...")
    if test_chat_endpoint():
        print("✅ DeepSeek-Prover integration is working properly!")
    else:
        print("❌ There was an issue with the DeepSeek-Prover integration.") 