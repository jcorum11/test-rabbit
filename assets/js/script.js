var testArr = [
    {q: "What are variables used for in JavaScript Programs?", a: 0, 0: "A. Storing numbers, dates, or other values", 1: "B. Varying randomly", 2: "C. Causing high-school algebra flashbacks", 3: "D. None of the above"}, 
    {q: "Which of the following is not considered a JavaScript operator?", a: 1, 0: "A. new", 1: "B. this", 2: "C. delete", 3: "D. typeof"}, 
    {q: "Which of the following is the structure of an if statement?", a: 2, 0: "A. if (conditional expression is true) thenexecute this codeend if", 1: "B. if (conditional expression is true)execute this codeend if", 2: "C. if (conditional expression is true)   {then execute this code>->}", 3: "D. if (conditional expression is true) then {execute this code}"}, 
    {q: "Scripting language are", a: 0, 0: "A. High Level Programming language", 1: "B. Assembly Level programming language", 2: "C. Machine level programming language", 3: "D. None of the above"}
]
var id = 0
var timeLeft = 25;
var score = 0
var notClicked = true;
var finished = false;
var pageContentEl = document.querySelector("#page-content");
var mainBoxTopEl = document.querySelector(".main-box.top");
var mainBoxCenterEl = document.querySelector(".main-box.center");
var mainBoxBottomEl = document.querySelector(".main-box.bottom");
var questionEl = document.querySelector("#question")
var timerEl = document.querySelector("#timer");
var headContentEl = document.querySelector("#head-content")

var startHandler = function(event) {
    var targetEl = event.target;
    finished = false;
    if (targetEl.matches(".btn.start")) {
        timerHandler();
        contentHandler();
    }
}

var questionHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".btn.answer")) {
        var answer = testArr[id].a;
        var answerAttr = parseInt(targetEl.getAttribute("answer-number"));
        if (answer === answerAttr && notClicked) {
            var answerCorrectEl = document.createElement("h2");
            answerCorrectEl.textContent = "Correct!";
            var nextButtonEl = document.createElement("button");
            nextButtonEl.textContent = "Next";
            nextButtonEl.className = "btn next";
            mainBoxBottomEl.appendChild(answerCorrectEl);
            mainBoxBottomEl.appendChild(nextButtonEl);
            timeLeft += 5;
            nextButtonEl.textContent = "Next";
            nextButtonEl.className = "btn next";
            mainBoxBottomEl.appendChild(nextButtonEl);
            score += 5;
            id++;
        }
        else if (answer !== answerAttr && notClicked) {
            var answerCorrectEl = document.createElement("h2");
            answerCorrectEl.textContent = "Incorrect";
            var nextButtonEl = document.createElement("button");
            mainBoxBottomEl.appendChild(answerCorrectEl);
            timeLeft -= 5;
            nextButtonEl.textContent = "Next";
            nextButtonEl.className = "btn next";
            mainBoxBottomEl.appendChild(nextButtonEl);
            id++;
        }
        notClicked = false;
    }
};

var nextButtonHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".btn.next")) {
        contentHandler()
    }
}

var scorePageContentHandler = function(quizStatus) {
    clearDivContent();
    var h1El = document.createElement("h1");
    h1El.textContent = quizStatus;
    mainBoxTopEl.appendChild(h1El);
    var h2El = document.createElement("h2");
    h2El.textContent = `Your Final Score is: ${score}`;
    mainBoxCenterEl.appendChild(h2El);
    var textInputEl = document.createElement("input");
    textInputEl.type = "text";
    textInputEl.id = "initials-form"
    textInputEl.name = "text-input";
    textInputEl.placeholder = "Your Initials";
    textInputEl.className = "form-input"
    var submitButtonEl = document.createElement("button");
    submitButtonEl.className = "btn submit";
    submitButtonEl.textContent = "Submit";
    var formEl = document.createElement("form");
    formEl.appendChild(textInputEl);
    formEl.appendChild(submitButtonEl);
    mainBoxBottomEl.appendChild(formEl);
}

var contentHandler = function() {
    if (testArr[id] === 0 || testArr[id]) {
        clearDivContent();
        notClicked = true;
        // change header
        var questionObj = testArr[id];
        var questionStr = questionObj.q
        questionEl.textContent = questionStr;
        mainBoxTopEl.appendChild(questionEl);

        // add questions to center as buttons. add styles to buttons and divs. 
        for (var i = 0; i <= 3; i++) {
            var answerButtonEl = document.createElement("button");
            answerButtonEl.textContent = testArr[id][i];
            answerButtonEl.className = "btn answer";
            answerButtonEl.setAttribute("style", "display: block;");
            answerButtonEl.setAttribute("answer-number", Object.keys(testArr[id])[i]);
            mainBoxCenterEl.appendChild(answerButtonEl);
        }
    }
    else if (testArr[id] === undefined || timeLeft <= 0) {
        finished = true;
        scorePageContentHandler("Quiz Complete!");
    }
    
}

var clearDivContent = function() {
    // remove elements from main-box top, center, and bottom and add new empty divs with styles
    notClicked = true;
    while (mainBoxTopEl.firstChild) {
        mainBoxTopEl.removeChild(mainBoxTopEl.firstChild);
    }
    while (mainBoxCenterEl.firstChild) {
        mainBoxCenterEl.removeChild(mainBoxCenterEl.firstChild);
    }
    while (mainBoxBottomEl.firstChild) {
        mainBoxBottomEl.removeChild(mainBoxBottomEl.firstChild);
    }
}

// timer
var timerHandler = function() {
    if (!id) {
        var timerInterval = setInterval(function() {
            timeLeft--;
            timerEl.textContent = timeLeft;
            if (timeLeft === 0) {
                scorePageContentHandler("You ran out of time!")
                clearInterval(timerInterval);
            }
            else if (finished) {
                clearInterval(timerInterval);
            }
        }, 1000);
    }
};

var formHandler = function() {
    event.preventDefault();
    userInitials = document.querySelector("#initials-form").value.toUpperCase();
    var scores = localStorage.getItem("scores");
    if (!scores) {
        scores = [];
    }
    else {
        scores = JSON.parse(scores);
    }
    userData = {"initials": userInitials, "score": score};
    scores.push(userData);
    localStorage.setItem("scores", JSON.stringify(scores));
    highScoreHandler();
}

var viewHighScores = function(event) {
    var targetEl = event.target;
    if (targetEl.matches("#high-score-tag")) {
        highScoreHandler();
    }
}

var highScoreHandler = function() {
    clearDivContent();
    var h1El = document.createElement("h1");
    h1El.textContent = "High Scores";
    mainBoxTopEl.appendChild(h1El);
    var scores = localStorage.getItem("scores");
    if (!scores) {
        scores = [];
    }
    else {
        scores = JSON.parse(scores);
    }
    for (var i = 0; i < scores.length; i++) {
        userData = scores[i];
        var h2El = document.createElement("h2");
        h2El.textContent = `${i + 1}. ${userData.initials} - ${userData.score}`;
        mainBoxCenterEl.appendChild(h2El);
    }
    var restartButtonEl = document.createElement("button");
    restartButtonEl.textContent = "Restart";
    restartButtonEl.className = "btn restart";
    var restartAnchorEl = document.createElement("a");
    restartAnchorEl.setAttribute("href", "/");
    restartAnchorEl.appendChild(restartButtonEl)
    mainBoxBottomEl.appendChild(restartAnchorEl);
}

pageContentEl.addEventListener("click", startHandler);
pageContentEl.addEventListener("click", questionHandler);
pageContentEl.addEventListener("click", nextButtonHandler);
pageContentEl.addEventListener("submit", formHandler);
headContentEl.addEventListener("click", viewHighScores);

