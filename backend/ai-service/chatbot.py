import sys, json
from chatbot_logic import answer_question

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())

    question = data.get("question", "")
    ai_results = data.get("aiResults", [])
    metrics = data.get("metrics", {})

    answer = answer_question(question, ai_results, metrics)

    print(json.dumps({"answer": answer}))
