var testArr = [
    {q: "Question 1", a: 0, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 2", a: 1, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 3", a: 2, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 4", a: 3, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}
]
var id = 0
var timeLeft = 1;
var score = 0
var pageContentEl = document.querySelector("#page-content");
var mainBoxTopEl = document.querySelector(".main-box.top");
var mainBoxCenterEl = document.querySelector(".main-box.center");
var mainBoxBottomEl = document.querySelector(".main-box.bottom");
var questionEl = document.querySelector("#question")
var timerEl = document.querySelector("#timer");

var startHandler = function(event) {
    var targetEl = event.target;
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
        if (answer === answerAttr) {
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
        else {
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
        scorePageContentHandler("Quiz Complete!");
    }
    
}

var clearDivContent = function() {
    // remove elements from main-box top, center, and bottom and add new empty divs with styles
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
        var h3El = document.createElement("h3");
        h3El.textContent = `${userData.initials} ${userData.score}`;
        mainBoxCenterEl.appendChild(h3El);
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
