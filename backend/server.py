from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    print(data)
    user_message = data['message']

    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

    data = {
        "contents": [{"parts": [{"text": user_message}]}]  
    }

    api_key = os.getenv('API_KEY') 

    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, json=data, params={'key': api_key})
    print(response)

    print(user_message)
    # test
    # response_message = "This is a response from the server."
    response_message = response.json()['candidates'][0]['content']['parts'][0]['text']
    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True)
