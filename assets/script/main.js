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

function adjustTimer() {
    timer--;
    timerSpan.innerHTML = `${timer}s`;
    if (timer == 0) {clearInterval(t)};
}

function startQuiz() {
    // Ready to begin the quiz
    startButton.style.visibility = "hidden";
    document.getElementById("quizzlet").style.visibility = "visible";
 
    // Populate Quiz Options
    randomQ = randomFrom(codeQuiz);
    document.getElementById("question").innerHTML = randomQ.question;

    [0, 1, 2, 3].forEach(i => {
        choiceSpans[i].innerHTML = randomQ.options[i];
    });

    timer = 60;

    var t = setInterval(adjustTimer, 1000)

    // Receive User Input

    // Update Score

    // Continue Game Loop unless Timer is All Out
}

startButton.addEventListener("click", startQuiz);