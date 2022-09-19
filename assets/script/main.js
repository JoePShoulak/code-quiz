// HTML Variables
var startButton = document.getElementById("start-button");
var timerSpan = document.getElementById("timer");
var scoreSpan = document.getElementById("score")
var quizzlet = document.getElementById("quizzlet");

// Javascript Variables
var currentQuestion = null;
var userChoice = 0;
var userScore = 0;

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

// Start the quiz
function startQuiz() {
    // Show the correct items
    startButton.style.visibility = "hidden";
    quizzlet.style.visibility = "visible";
 
    // Start Timer
    timer = 60;
    loadQuestion();

    // Set an interval of 1000ms, mainly for the timer
    var t = setInterval(function() {
        // Update the timer
        timer--;
        timerSpan.innerHTML = `${timer}s`;

        // If time ran out...
        if (timer <= 0) {
            clearInterval(t) // Break out of this
            quizzlet.style.visibility = "hidden" // Hide the quizzlet
        };

        // If the user made a choice...
        if (userChoice != 0) {
            if (isUserCorrect()) { // If it was correct...
                userScore++; // Increase score
            } else {
                userScore--; // Decrease score and timer and update the timer
                timer -= 5;
                timerSpan.innerHTML = `${timer}s`;
            }

            // Whether the user got it right or wrong...
            loadQuestion(); // New question
            userChoice = 0; // Reset choice
            scoreSpan.innerHTML = userScore; // Update Score
        }
    }, 1000)

    // End Game / submit high score
}

startButton.addEventListener("click", startQuiz);