from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data['message']
    print(user_message)
    # test
    response_message = "This is a response from the server."

    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True)


