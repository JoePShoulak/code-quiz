var startButton = document.getElementById("start-button");
var timerSpan = document.getElementById("timer");
var scoreSpan = document.getElementById("score")
var quizzlet = document.getElementById("quizzlet");


var currentQuestion = null;
var userChoice = 0;
var userScore = 0;


var choiceSpans = [
    document.getElementById(`choice1`),
    document.getElementById(`choice2`),
    document.getElementById(`choice3`),
    document.getElementById(`choice4`)
]

function choose1() { userChoice = 1; }
function choose2() { userChoice = 2; }
function choose3() { userChoice = 3; }
function choose4() { userChoice = 4; }

choiceSpans[0].addEventListener("click", choose1);
choiceSpans[1].addEventListener("click", choose2);
choiceSpans[2].addEventListener("click", choose3);
choiceSpans[3].addEventListener("click", choose4);

function randomFrom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function startTimer() {

}

function loadQuestion() {
    currentQuestion = randomFrom(codeQuiz);
    document.getElementById("question").innerHTML = currentQuestion.question;

    [0, 1, 2, 3].forEach(i => {
        choiceSpans[i].innerHTML = currentQuestion.options[i];
    });
}

function evaluateChoice(userChoice) {
    return (currentQuestion.correct == currentQuestion.options[userChoice-1]);
}

function startQuiz() {
    // Ready to begin the quiz
    startButton.style.visibility = "hidden";
    quizzlet.style.visibility = "visible";
 
    // Start Timer
    timer = 60;
    loadQuestion();
    var t = setInterval(function() {
        timer--;
        timerSpan.innerHTML = `${timer}s`;
        if (timer <= 0) {
            clearInterval(t)
            quizzlet.style.visibility = "hidden"
        };

        if (userChoice != 0) {
            var r = evaluateChoice(userChoice);
            if (r) {
                userScore++;
            } else {
                userScore--;
                timer -= 5;
            }
            loadQuestion();
            userChoice = 0;
            scoreSpan.innerHTML = userScore;
        }
    }, 1000)

    // End Game / submit high score
}

startButton.addEventListener("click", startQuiz);