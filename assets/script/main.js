// HTML Variables
var startButton = document.getElementById("start-button");
var resetButton = document.getElementById("reset-button");
var playAgain = document.getElementById("play-again");
var timerSpan = document.getElementById("timer");
var scoreSpan = document.getElementById("score")
var quizzlet = document.getElementById("quizzlet");
var scores = document.getElementById("scores");

// Javascript Variables
var currentQuestion = null;
var userChoice = 0;
var userScore = 0;
var timerObject = null;

// The Choice Spans
var choiceSpans = [
    document.getElementById("choice1"),
    document.getElementById("choice2"),
    document.getElementById("choice3"),
    document.getElementById("choice4")
]

// Add onclicks to update userChoice (which we're watching as received input)
choiceSpans[0].addEventListener("click", function() { userChoice = 1; });
choiceSpans[1].addEventListener("click", function() { userChoice = 2; });
choiceSpans[2].addEventListener("click", function() { userChoice = 3; });
choiceSpans[3].addEventListener("click", function() { userChoice = 4; });

// Helper function; random element from array 
function randomFrom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

// Delete the added score elements
function deleteScoreElements() {
    const scores = document.querySelectorAll('.score');
    scores.forEach(s => {
        s.remove();
    })
}

function updateUserUI() {
    timerSpan.innerHTML = `${timer}s`;
    scoreSpan.innerHTML = userScore; // Update Score
}

// Empty the high scores from local storage
function resetLocal() {
    localStorage.clear();

    deleteScoreElements();
}

// Populate the HTML on the page with a random question from the file
function loadQuestion() {
    currentQuestion = randomFrom(codeQuiz);
    document.getElementById("question").innerHTML = currentQuestion.question;

    [0, 1, 2, 3].forEach(i => {
        choiceSpans[i].innerHTML = currentQuestion.options[i];
    });
}

// Return a boolean of matching the correctness of the user's guess
function isUserCorrect() {
    return (currentQuestion.correct == currentQuestion.options[userChoice-1]);
}

// Display all the new scores
function renderScores(highScores) {
    highScores.forEach(score => {
        // Make a new span for each score
        var scoreElement = document.createElement("span");
        scoreElement.className="score";
        scoreElement.textContent = `${score.initials}: ${score.score}`
        document.body.appendChild(scoreElement);
    });
}

// Display (and hide) the relevant parts of the page
function showHighScore() {
    quizzlet.style.visibility = "hidden" // Hide the quizzlet
    scores.style.visibility = "visible"; // Show this current content

    // Load scores
    var highScores = JSON.parse(localStorage.getItem("scores"));
    
    var myScore = {
        initials: prompt("Enter your initials"),
        score: userScore,
    }

    // Add our score to the list (and check and fix if it's empty because there are none)
    if (highScores == null) {highScores = [];}
    highScores.push(myScore);

    // Save our updated scores back to our localStorage
    localStorage.setItem("scores", JSON.stringify(highScores));

    renderScores(highScores);
}

// The main game loops, manages the "playing" of the game
function gameLoop() {
    // Update the timer
    timer--;
    updateUserUI();

    // If time ran out...
    if (timer <= 0) {
        clearInterval(timerObject) // Break out of this
        showHighScore();
    };

    // If the user made a choice...
    if (userChoice != 0) {
        if (isUserCorrect()) { // If it was correct...
            userScore++; // Increase score
        } else {
            userScore--; // Decrease score and timer and update the timer
            timer -= 5;
            updateUserUI();
        }

        // Whether the user got it right or wrong...
        updateUserUI(); // Update Score
        userChoice = 0; // Reset choice
        loadQuestion(); // New question
    }
}

// Start the quiz
function startQuiz() {
    // Show the correct items
    startButton.style.visibility = "hidden";
    quizzlet.style.visibility = "visible";
    scores.style.visibility = "hidden";

    deleteScoreElements();
    userScore = 0;
    updateUserUI(); // Update Score

 
    // Start Timer and load first question
    timer = 60;
    loadQuestion();

    // Set an interval of 1000ms, mainly for the timer
    timerObject = setInterval(gameLoop, 1000);
}

// Add our Event Listeners
startButton.addEventListener("click", startQuiz);
playAgain.addEventListener("click", startQuiz);
resetButton.addEventListener("click", resetLocal);