var startButton = document.getElementById("start-button");

function startQuiz() {
    // Ready to begin the quiz
    startButton.style.visibility = "hidden";
    document.getElementById("quizzlet").style.visibility = "visible";
 
    // Populate Quiz Options
    document.getElementById("question").innerHTML = codeQuiz[0].question;

    [1, 2, 3, 4].forEach(element => {
        document.getElementById(`choice${element}`).innerHTML = codeQuiz[0].options[element-1];
    });

    // Receive User Input

    // Update Score

    // Continue Game Loop unless Timer is All Out
}

startButton.addEventListener("click", startQuiz);