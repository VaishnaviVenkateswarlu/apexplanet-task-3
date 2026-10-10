// =====================================
// INTERACTIVE KNOWLEDGE QUIZ
// =====================================

const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["Python", "HTML", "SQL", "Java"],
        answer: 1
    },
    {
        question: "Which CSS layout system is useful for two-dimensional layouts?",
        options: ["CSS Grid", "HTML", "JSON", "SQL"],
        answer: 0
    },
    {
        question: "Which language adds interactivity to web pages?",
        options: ["CSS", "HTML", "JavaScript", "XML"],
        answer: 2
    },
    {
        question: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Advanced Program Internet",
            "Applied Processing Information",
            "Application Page Integration"
        ],
        answer: 0
    },
    {
        question: "Which method is commonly used to fetch data from a web API?",
        options: ["fetch()", "print()", "prompt()", "writeCSS()"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const quizMessage = document.getElementById("quizMessage");
const nextButton = document.getElementById("nextButton");
const questionCounter = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressBar = document.getElementById("progressBar");
const quizResult = document.getElementById("quizResult");
const finalScore = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

function showQuestion() {
    answered = false;

    const item = questions[currentQuestion];

    questionElement.textContent = item.question;
    optionsElement.replaceChildren();

    quizMessage.textContent = "";
    quizMessage.className = "message";

    nextButton.hidden = true;
    quizResult.hidden = true;

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    item.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "option-button";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    if (answered) {
        return;
    }

    answered = true;

    const correctIndex = questions[currentQuestion].answer;
    const optionButtons = optionsElement.querySelectorAll("button");

    optionButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        quizMessage.textContent = "Correct! Great job! 🎉";
        quizMessage.className = "message success";
    } else {
        optionButtons[selectedIndex].classList.add("incorrect");

        quizMessage.textContent =
            `Not quite! The correct answer is ${questions[currentQuestion].options[correctIndex]}.`;

        quizMessage.className = "message error";
    }

    scoreDisplay.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "View Results";
    } else {
        nextButton.textContent = "Next Question →";
    }

    nextButton.hidden = false;
}

function nextQuestion() {
    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.textContent = "You've completed all the questions!";
    optionsElement.replaceChildren();
    quizMessage.textContent = "";
    nextButton.hidden = true;

    progressBar.style.width = "100%";
    questionCounter.textContent = "Quiz Completed";

    quizResult.hidden = false;
    finalScore.textContent =
        `You scored ${score} out of ${questions.length}.`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    nextButton.textContent = "Next Question →";

    showQuestion();
}

nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Start the quiz.
showQuestion();


// =====================================
// PUBLIC API: INTERESTING FACTS
// =====================================

const factText = document.getElementById("factText");
const factButton = document.getElementById("factButton");
const apiStatus = document.getElementById("apiStatus");

// Public API endpoint.
const API_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

async function loadFact() {
    factButton.disabled = true;
    factText.textContent = "Fetching an interesting fact...";
    apiStatus.textContent = "Connecting to the public API...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("The API request failed.");
        }

        const data = await response.json();

        if (!data.text) {
            throw new Error("No fact was returned.");
        }

        factText.textContent = data.text;
        apiStatus.textContent = "Fact loaded successfully from the public API.";
    } catch (error) {
        factText.textContent =
            "We couldn't load a fact right now. Please check your internet connection and try again.";

        apiStatus.textContent =
            "Unable to connect to the public API. Please try again.";
    } finally {
        factButton.disabled = false;
    }
}

factButton.addEventListener("click", loadFact);