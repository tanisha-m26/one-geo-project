from flask import Blueprint, request, jsonify
from chatbot_logic import interpret_question

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/chatbot", methods=["POST"])
def chatbot():
    data = request.json

    question = data.get("question", "")
    ai_results = data.get("aiResults", [])
    metrics = data.get("metrics", {})

    answer = interpret_question(question, ai_results, metrics)

    return jsonify({
        "question": question,
        "answer": answer
    })
