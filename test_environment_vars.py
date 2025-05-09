import os
from deepseek_prover import query_deepseek_prover

# Test function to check environment variable handling
def test_api_key_env_vars():
    print("Testing environment variable handling for DeepSeek-Prover integration")
    
    # Check for multiple environment variable names
    vite_key = os.getenv("VITE_HF_API_KEY")
    hf_key = os.getenv("HF_API_KEY")
    huggingface_key = os.getenv("HUGGINGFACE_API_KEY")
    next_public_key = os.getenv("NEXT_PUBLIC_HF_API_KEY")
    
    print(f"VITE_HF_API_KEY present: {vite_key is not None}")
    print(f"HF_API_KEY present: {hf_key is not None}")
    print(f"HUGGINGFACE_API_KEY present: {huggingface_key is not None}")
    print(f"NEXT_PUBLIC_HF_API_KEY present: {next_public_key is not None}")
    
    # Check if any key is available
    if any([vite_key, hf_key, huggingface_key, next_public_key]):
        print("✅ At least one API key environment variable is set!")
    else:
        print("❌ No API key environment variables found.")
        print("Please set one of these environment variables with your Hugging Face API key:")
        print("  - VITE_HF_API_KEY")
        print("  - HF_API_KEY")
        print("  - HUGGINGFACE_API_KEY")
        print("  - NEXT_PUBLIC_HF_API_KEY")
        return False
    
    # Test the actual function to make sure it can find the key
    try:
        # We'll use a short test prompt to validate the key is working
        # We set a short timeout to just check API key validity without waiting for a full response
        prompt = "Hello, this is a test."
        response = query_deepseek_prover(prompt, max_new_tokens=10)
        print("✅ DeepSeek-Prover API call successful!")
        print(f"Response snippet: {response[:50]}...")
        return True
    except ValueError as e:
        if "API key not provided" in str(e):
            print(f"❌ API key error: {e}")
            return False
        else:
            print(f"❌ Other ValueError: {e}")
            return False
    except Exception as e:
        print(f"❌ Other error: {e}")
        return False

if __name__ == "__main__":
    test_api_key_env_vars() 