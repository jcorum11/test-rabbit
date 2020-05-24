var testArr = [
    {q: "Question 1", a: 0, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 2", a: 1, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 3", a: 2, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}, 
    {q: "Question 4", a: 3, 0: "Answer 1", 1: "Answer 2", 2: "Answer 3", 3: "Answer 4"}
]
var id = 0
var timeLeft = 25;
var pageContentEl = document.querySelector("#page-content");
var mainBoxTopEl = document.querySelector(".main-box.top");
var mainBoxCenterEl = document.querySelector(".main-box.center");
var mainBoxBottomEl = document.querySelector(".main-box.bottom");
var questionEl = document.querySelector("#question")
var timerEl = document.querySelector("#timer");

var answerHandler = function(event) {
    var targetEl = event.target;
    if (targetEl.matches(".btn.answer")) {
        var answer = testArr[id - 1].a;
        var answerAttr = parseInt(targetEl.getAttribute("answer-number"));
        if (answer === answerAttr) {
            var answerCorrectEl = document.createElement("h2");
            answerCorrectEl.textContent = "Correct!";
            var nextButtonEl = document.createElement("button");
            nextButtonEl.textContent = "Next";
            nextButtonEl.className = "btn next";
            mainBoxBottomEl.appendChild(answerCorrectEl);
            mainBoxBottomEl.appendChild(nextButtonEl);
            console.log(mainBoxBottomEl);
            timeLeft += 5;
        }
        else {
            timeLeft -= 5;
        }
    }
};



var contentHandler = function(event) {
    var targetEl = event.target
    if (targetEl.matches(".btn")) {
        if(!id) {
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
            timerHandler();
        }
        else {
            id++
        }
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
                clearInterval(timerInterval);
            }
        }, 1000);
    }
};



pageContentEl.addEventListener("click", answerHandler);
pageContentEl.addEventListener("click", nextButtonHandler);
