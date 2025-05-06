# Welli Unified Healthcare Platform

This project is an original idea and implementation by Prathamesh. All rights reserved.

Any unauthorized use, reproduction, or distribution of this code, design, or concept is strictly prohibited.

For licensing or collaboration, contact the author.

## Local AI Backend (No API Key Required)

This project now includes a free, self-hosted AI backend for the Welli Assistant chatbot. No API key or environment variable is required.

### To run the AI backend:

```sh
pip install fastapi uvicorn
python ai_server.py
```

The server will start at http://localhost:8000. The frontend will automatically use this for all AI chatbot features.
