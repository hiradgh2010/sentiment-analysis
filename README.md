# AI Sentiment Analyzer

A classroom project using a pre-trained Hugging Face model.

## Model

Model:
`distilbert/distilbert-base-uncased-finetuned-sst-2-english`

Task:
Sentiment analysis / text classification.

The model predicts two labels:
- POSITIVE
- NEGATIVE

The model is trained for English sentiment classification using the SST-2 task.

## Technologies

- Python
- Flask
- Hugging Face Transformers
- PyTorch
- HTML
- CSS
- JavaScript

## Installation

Open a terminal in this project folder.

### 1. Create a virtual environment

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

If PowerShell blocks activation, use:

```powershell
venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the project

```bash
python app.py
```

The first run downloads the model from Hugging Face, so it can take some time.

Then open:

http://127.0.0.1:5000

## Test examples

Positive:

`I love this product. It is amazing!`

Negative:

`This service was terrible and disappointing.`

Important:
This model is designed for English text. Its predictions should not be treated as perfect or as a human understanding of emotions.
