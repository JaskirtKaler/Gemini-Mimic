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
    user_message = data['message']

    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

    data = {
        "contents": [{"parts": [{str(user_message)}]}]  
    }

    api_key = os.getenv('API_KEY') 

    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.post(url, headers=headers, json=data, params={'key': api_key})


    print(user_message)
    # test
    response_message = "This is a response from the server."

    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True)
