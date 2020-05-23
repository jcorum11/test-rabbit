var testArr = [
    {q: "Question 1", 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4"}, 
    {q: "Question 2", 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4"}, 
    {q: "Question 3", 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4"}, 
    {q: "Question 4", 1: "Answer 1", 2: "Answer 2", 3: "Answer 3", 4: "Answer 4"}
]
var mainBoxTopEl = document.querySelector(".main-box.top");
var mainBoxCenterEl = document.querySelector(".main-box.center");
var mainBoxBottomEl = document.querySelector(".main-box.bottom");
var pageContentEl = document.querySelector("#page-content")

var startTest = function(event) {
    
    var targetEl = event.target;
    if (targetEl.matches(".btn.start")) {
        // remove elements from main-box top, center, and bottom and add new empty divs with styles
        question1 = testArr[0]
        mainBoxTopEl.remove();
        mainBoxCenterEl.remove();
        mainBoxBottomEl.remove();
        var newMainBoxTopEl = document.createElement("div");
        var newMainBoxCenterEl = document.createElement("div");
        var newMainBoxBottomEl = document.createElement("div");
        newMainBoxTopEl.className = "main-box top";
        newMainBoxCenterEl.className = "main-box center";
        newMainBoxCenterEl.className = "main-box bottom"
        newMainBoxTopEl.setAttribute("style", "text-align: left;");
        newMainBoxCenterEl.setAttribute("style", "text-align: left;")

        // add "Question 1" to top
        var newH1El = document.createElement("h1");
        newH1El.textContent = question1.q;
        newMainBoxTopEl.appendChild(newH1El);

        // add questions to center as buttons. add styles to buttons and divs. 
        for (var i = 1; i <= 4; i++) {
            var answerButtonEl = document.createElement("button");
            var buttonContainerEl = document.createElement("div");
            answerButtonEl.textContent = testArr[0][i];
            answerButtonEl.className = "btn answer";
            buttonContainerEl.appendChild(answerButtonEl);
            newMainBoxCenterEl.appendChild(buttonContainerEl);
        }

        // add divs to page
        pageContentEl.appendChild(newMainBoxTopEl);
        pageContentEl.appendChild(newMainBoxCenterEl);
        pageContentEl.appendChild(newMainBoxBottomEl);
    }
};

pageContentEl.addEventListener("click", startTest);