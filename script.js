let timeRemaining = 30 * 60; // 30 minutes in seconds
const timerElement = document.getElementById("timer");

const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `Time Remaining: ${minutes}m ${seconds}s`;

    if (timeRemaining <= 0) {
        clearInterval(timerInterval); // Stop the timer
        submitQuiz(); // Automatically submit the quiz when time is up
    } else {
        timeRemaining--;
    }
};
const questions = [
    {
        question: "A block of mass 2 kg is placed on a rough surface with a coefficient of friction 0.4. What is the force required to just move the block? (Take g = 10 m/s²)",
        options: ["6 N", "8 N", "4 N", "10 N"],
        answer: "8 N",
    },
    {
        question: "A body starts moving with an initial velocity of 5 m/s at an angle of 60° with the horizontal. What is the horizontal component of its velocity?",
        options: ["2.5 m/s", "4.33 m/s", "5 m/s", "10 m/s"],
        answer: "2.5 m/s",
    },
    {
        question: "The angle of repose for a surface is 30°. What is the coefficient of friction?",
        options: ["0.5", "0.577", "0.707", "1"],
        answer: "0.577",
    },
    {
        question: "What is the value of sin²(45°) + cos²(45°)?",
        options: ["0", "1", "0.5", "2"],
        answer: "1",
    },
    {
        question: "A block of mass 20 kg is placed on an inclined plane making an angle of 30° with the horizontal. Find the component of gravitational force parallel to the plane. (g = 10 m/s²)",
        options: ["100", "150", "200", "125"],
        answer: "100",
    },
    {
        question: "A 5 kg block slides down an inclined plane at 37° with a coefficient of kinetic friction of 0.3. What is its acceleration? (Take g = 10 m/s²)",
        options: ["13 m/s²", "0.4 m/s²", "3 m/s²", "2 m/s²"],
        answer: "3 m/s²",
    },
    {
        question: "If \\( \\tan(A+B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B} \\), and \\( A = 30^\\circ \\), \\( B = 45^\\circ \\), find the value of \\( \\tan(A+B) \\).",
        options: ["2 + √3", "√3", "1 + √3", "√3/2"],
        answer: "2 + √3",
    },
    {
        question: "Prove that \\( \\sin^4 x - \\cos^4 x = 2 \\cos^2 x - 1 \\). What is the value of the equation when \\( x = 45^\\circ \\)?",
        options: ["0", "1", "-1", "1/2"],
        answer: "0",
    },
    {
        question: "Find the maximum value of \\( \\sin x + \\cos x + \\tan x + \\cot x + \\sec x + \\csc x \\):",
        options: ["3√2", "4 + √2", "3 + √3", "undefined"],
        answer: "undefined",
    },
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");


// Render Questions
questions.forEach((q, index) => {
    const section = document.createElement("section");
    section.classList.add("question-section");
    if (index === 0) section.classList.add("active");

    section.innerHTML = `
        <h2>Question ${index + 1}</h2>
        <p>${q.question}</p>
        ${q.options
            .map(
                (option) =>
                    `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label><br>`
            )
            .join("")}
    `;
    quizContainer.appendChild(section);
});

const sections = document.querySelectorAll(".question-section");
const totalQuestions = sections.length;

const updateNavigation = () => {
    document.getElementById("prev-btn").disabled = currentQuestion === 0;
    document.getElementById("next-btn").disabled = currentQuestion === totalQuestions - 1;
    document.getElementById("submit-btn").style.display =
        currentQuestion === totalQuestions - 1 ? "inline-block" : "none";
};

const showQuestion = (index) => {
    sections.forEach((section, i) => {
        section.classList.toggle("active", i === index);
    });
    updateNavigation();
};

const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
};

const prevQuestion = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
};

const submitQuiz = () => {
    questions.forEach((q, i) => {
        const selectedOption = document.querySelector(
            `input[name="q${i}"]:checked`
        )?.value;
        if (selectedOption === q.answer) {
            score++;
        }
    });

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your score: ${score}/${totalQuestions}`;
    resultDiv.style.color =
        score === totalQuestions
            ? "green"
            : score > totalQuestions / 2
            ? "orange"
            : "red";
};

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("prev-btn").addEventListener("click", prevQuestion);
document.getElementById("submit-btn").addEventListener("click", submitQuiz);

showQuestion(currentQuestion);
