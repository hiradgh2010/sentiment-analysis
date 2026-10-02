const textInput = document.getElementById("textInput");
const counter = document.getElementById("counter");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");
const message = document.getElementById("message");
const label = document.getElementById("label");
const score = document.getElementById("score");
const progressBar = document.getElementById("progressBar");

textInput.addEventListener("input", () => {
    counter.textContent = `${textInput.value.length} / 1000`;
});

document.querySelectorAll(".example").forEach(button => {
    button.addEventListener("click", () => {
        textInput.value = button.textContent;
        textInput.dispatchEvent(new Event("input"));
        analyze();
    });
});

analyzeBtn.addEventListener("click", analyze);

async function analyze() {
    const text = textInput.value.trim();

    message.classList.add("hidden");
    result.classList.add("hidden");

    if (!text) {
        showMessage("Please enter a sentence first.");
        return;
    }

    analyzeBtn.disabled = true;
    analyzeBtn.textContent = "Analyzing...";

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        label.textContent = data.label;
        score.textContent = `${data.score}%`;
        progressBar.style.width = `${data.score}%`;

        result.classList.remove("hidden");
    } catch (error) {
        showMessage(error.message);
    } finally {
        analyzeBtn.disabled = false;
        analyzeBtn.textContent = "Analyze Sentiment";
    }
}

function showMessage(text) {
    message.textContent = text;
    message.classList.remove("hidden");
}
