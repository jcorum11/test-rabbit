var testArr = [
    {q: "Question 1", 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 2", 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 3", 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 4", 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}
]
var timeLeft = 25;
var mainBoxTopEl = document.querySelector(".main-box.top");
var mainBoxCenterEl = document.querySelector(".main-box.center");
var mainBoxBottomEl = document.querySelector(".main-box.bottom");
var pageContentEl = document.querySelector("#page-content");
var timerEl = document.querySelector("#timer");
var newMainBoxTopEl = document.createElement("div");
var newMainBoxCenterEl = document.createElement("div");
var newMainBoxBottomEl = document.createElement("div");

// timer
var timerHandler = function(event) {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
};

var buttonLoop = function() {
    // add questions to center as buttons. add styles to buttons and divs. 
    for (var i = 0; i <= 3; i++) {
        if (!i) {
            // add "Question 1" to top
            var question = testArr[i]
            var newH1El = document.createElement("h1");
            newH1El.textContent = question.q;
            newMainBoxTopEl.appendChild(newH1El);
        }
        var answerButtonEl = document.createElement("button");
        var buttonContainerEl = document.createElement("div");
        answerButtonEl.textContent = testArr[0][i];
        answerButtonEl.className = "btn answer";
        buttonContainerEl.appendChild(answerButtonEl);
        newMainBoxCenterEl.appendChild(buttonContainerEl);
    }

}

// first question
var firstQuestionHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".btn.start")) {
        // remove elements from main-box top, center, and bottom and add new empty divs with styles
        mainBoxTopEl.remove();
        mainBoxCenterEl.remove();
        mainBoxBottomEl.remove();
        newMainBoxTopEl.className = "main-box top";
        newMainBoxCenterEl.className = "main-box center";
        newMainBoxCenterEl.className = "main-box bottom"
        newMainBoxTopEl.setAttribute("style", "text-align: left;");
        newMainBoxCenterEl.setAttribute("style", "text-align: left;")

        // run button loop
        buttonLoop();

        // add divs to page
        pageContentEl.appendChild(newMainBoxTopEl);
        pageContentEl.appendChild(newMainBoxCenterEl);
        pageContentEl.appendChild(newMainBoxBottomEl);

        // run timerHandler
        timerHandler();
    }
};

// second question
var secondQuestionHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.match(".btn.answer")) {

    }
}

pageContentEl.addEventListener("click", firstQuestionHandler);
