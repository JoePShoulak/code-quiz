var startButton = document.getElementById("start-button");
var timerSpan = document.getElementById("timer");

var choiceSpans = [
    document.getElementById(`choice1`),
    document.getElementById(`choice2`),
    document.getElementById(`choice3`),
    document.getElementById(`choice4`)
]

function randomFrom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function startTimer() {
    var t = setInterval(function() {
        timer--;
        timerSpan.innerHTML = `${timer}s`;
        if (timer == 0) {clearInterval(t)};
    }, 1000)
}

function loadQuestion() {
    randomQ = randomFrom(codeQuiz);
    document.getElementById("question").innerHTML = randomQ.question;

    [0, 1, 2, 3].forEach(i => {
        choiceSpans[i].innerHTML = randomQ.options[i];
    });
}

var userChoice = 0;

function startQuiz() {
    // Ready to begin the quiz
    startButton.style.visibility = "hidden";
    document.getElementById("quizzlet").style.visibility = "visible";
 
    // Start Timer
    timer = 60;
    startTimer();
    loadQuestion();

    // End Game / submit high score
}

startButton.addEventListener("click", startQuiz);