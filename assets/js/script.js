var quizQuestions = document.getElementById("quiz-questions");
var timeLeft = document.getElementById("time-left");
var timer = document.getElementById("timer");
var startBtn = document.getElementById("start-btn");
var qTitle = document.getElementById("question-title");
var qAnswers = document.getElementById("q-answers");
var newScore = document.getElementById("score");
var scoreBtn = document.getElementById("score-btn");
var feedback = document.getElementById("feedback");
var info = document.getElementById("quiz-info");
var addScore = document.getElementById("add-score");
var currentIndex = 0;
var score = 0;
var count = 100;
var allScores = [];
var storedScores = JSON.parse(localStorage.getItem("userData"));

var questions = [
    {
        title: "In which HTML element do we link JavaScript?",
        choices: ["<script>", "<link>", "<js>", "<href>"],
        answer: "<script>"
    },
    {
        title: "Arrays in JavaScript can be used to store which of the following?",
        choices: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: "All of the Above",
    },
    {
        title: "What do String Values have to be enclosed in when assigned to variables?",
        choices: ["Curly Brackets", "Parentheses", "Quotes", "Carbonite"],
        answer: "Quotes",
    },
    {
        title: "What is the correct JavaScript syntax to write 'Hello World'?",
        choices: ["return.response('Hello World')", "document.write('Hello World')", "printIn ('Hello World')", "None of the Above"],
        answer: "document.write('Hello World')",
    },
    {
        title: "Which of these is NOT a JavaScript data type?",
        choices: ["Numbers", "Booleans", "Strings", "Arguments"],
        answer: "Arguments",
    },
    {
        title: "Which of these is the correct way to comment a single line in JavaScript?",
        choices: ["//single line comment", "<!--single line comment-->", "*single line comment*", "<single line comment>"],
        answer: "//single line comment",
    },
    {
        title: "Which of these is the Strict Equality Operator?",
        choices: ["==", "!=", "=", "==="],
        answer: "===",
    },
    {
        title: "Which of these is NOT a type of Pop-Up box available in JavaScript?",
        choices: ["Alert", "True or False", "Prompt", "Confirm"],
        answer: "True or False",
    },
    {
        title: "What method stops Event Bubbling?",
        choices: ["event.stopBubbling", "event.cancel.bubble", "event.stopPropagation", "event.preventBubble"],
        answer: "event.stopPropagation",
    },
    {
        title: "What does 'DOM' stand for?",
        choices: ["Document Orienting Model", "Dormant Object Modifier", "Document Object Manipulator", "None of the Above"],
        answer: "None of the Above",
    },
];

// hides the quiz questions and score input on page load
quizQuestions.style.display = "none";
addScore.style.display = "none";

// event listener for start of quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    if(storedScores !== null) {
        allScores = storedScores;
    };
    // hides the quiz info and start button after the quiz starts
    info.style.display = "none";
    startBtn.style.display = "none";
    // shows the quiz questions
    quizQuestions.style.display = "block";

    nextQuestion = questions[currentIndex]

    displayQuestion(nextQuestion);

    scoreTime();

};

scoreBtn.addEventListener("click", function (){
    let name = document.getElementById("input-initials").value;
    recordScore(name, count);
});

function scoreTime() {
    timerCount = setInterval(function() {
        count--;
        timeLeft.innerText = count;
        
        if(count === 0) {
            clearInterval(timeLeft);
            gameOver();
        }
    }, 1000 );
    
};

function recordScore(a, b) {
    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "highscores.html";
};

function displayQuestion(question) {
    qTitle.innerText = question.title;
    question.choices.forEach(element => {
        var button = document.createElement("button")
        button.className = "btn answer-btn"
        button.innerText = element
        qAnswers.appendChild(button)
        button.addEventListener("click", displayNextQuestion)
    });
};

function displayNextQuestion(e) {
    currentIndex++;
    if(currentIndex < questions.length) {
        qFeedback(e.target.innerText == nextQuestion.answer)
        qAnswers.innerHTML = ""
        if(currentIndex < questions.length) {
            nextQuestion = questions[currentIndex]
            displayQuestion(nextQuestion)
        } else {
            currentIndex = 0
            displayQuestion(nextQuestion)
        }
    } else {
        console.log("Game Over")
        gameOver()
    };
};

function qFeedback(response) {
    if(response) {
        feedback.innerText = "Correct!";
        console.log("Correct");
    } else {
        feedback.innerText = "Incorrect! The correct answer is: " + questions[currentIndex -1].answer;
        count = count -10;
        timeLeft.innerHTML = count;
        console.log("Incorrect");
    };

    setTimeout(function() {
        feedback.innerText = ""
    }, 1000 );
};

function gameOver() {
    newScore.innerText = count;
    addScore.style.display = "block";
    timer.style.display = "none";
    quizQuestions.style.display = "none";

}

