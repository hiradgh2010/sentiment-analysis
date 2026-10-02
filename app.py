from flask import Flask, render_template, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Pre-trained model from Hugging Face
MODEL_NAME = "distilbert/distilbert-base-uncased-finetuned-sst-2-english"

print("Loading AI model...")
classifier = pipeline("sentiment-analysis", model=MODEL_NAME)
print("Model loaded successfully.")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True) or {}
    text = (data.get("text") or "").strip()

    if not text:
        return jsonify({"error": "Please enter some text."}), 400

    # Limit input length for a simple classroom project
    text = text[:1000]

    result = classifier(text)[0]

    label = result["label"]
    score = round(float(result["score"]) * 100, 2)

    return jsonify({
        "label": label,
        "score": score,
        "text": text
    })


if __name__ == "__main__":
    app.run(debug=True)
