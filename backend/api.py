import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

# curl \
#   -H 'Content-Type: application/json' \
#   -d '{"contents":[{"parts":[{"text":"Write a story about a magic backpack"}]}]}' \
#   -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY

url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

# "contents": [{"parts": [{"text": "PROMPT"}]}]  
data = {
    "contents": [{"parts": [{"text": "Write a story about a magic backpack"}]}]  
}

api_key = os.getenv('API_KEY') 
print(api_key)

headers = {
    'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers, json=data, params={'key': api_key})

if response.status_code == 200:
    print("Success:")
    print(response.json())
else:
    print("Error:")
    print(response.text)