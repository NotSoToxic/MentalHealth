from flask import Flask, request, jsonify
from flask_cors import CORS
import re

app = Flask(__name__)
CORS(app)

class MentalHealthChatbot:
    def __init__(self):
        self.responses = []
        self.questions = [
            "How often do you feel sad or hopeless?",
            "Do you have trouble concentrating?",
            "Have you experienced a loss of interest in things you once enjoyed?",
            "Have you had thoughts of self-harm or suicide?",
            # Add more questions as needed
        ]
        self.diagnoses = {
            0: "You seem to be in good mental health.",
            1: "You might be experiencing mild stress.",
            2: "You may be showing signs of generalized anxiety disorder (GAD).",
            3: "You might be suffering from mild to moderate depression.",
            4: "You may be dealing with severe depression. Please seek professional help immediately.",
        }

    def get_evaluation(self):
        score = 0
        for response in self.responses:
            if re.search(r'\b(?:yes|often|always)\b', response, re.IGNORECASE):
                score += 1
        return score

@app.route('/chat', methods=['POST'])
def chat():
    if request.method == 'POST':
        data = request.get_json()
        chatbot = MentalHealthChatbot()
        chatbot.responses = data['responses']
        evaluation = chatbot.get_evaluation()
        if evaluation in chatbot.diagnoses:
            return jsonify({'evaluation': evaluation, 'diagnosis': chatbot.diagnoses[evaluation]})
        else:
            return jsonify({'evaluation': evaluation, 'diagnosis': "It is recommended to consult a mental health professional for an accurate diagnosis."})

if __name__ == '__main__':
    app.run(debug=True)
