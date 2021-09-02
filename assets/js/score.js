var storedScores = JSON.parse(localStorage.getItem("userData"));
var highScoresList = document.querySelector("#high-scores-list");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");


function displayScores() {
    if (storedScores !== null) {
        var scoreList = document.createElement("ol");
        scoreList.className = "scoreListClass";
        for (var i = 0; i < storedScores.length; i++) {
            var initials = storedScores[i].inits;
            var scores = storedScores[i].userScore;
            var scoreEntry = document.createElement("li");
            scoreEntry.innerHTML = initials + " - " + scores;
            scoreList.appendChild(scoreEntry);
        }
        
        highScoresList.appendChild(scoreList);

        console.log(scoreEntry);
    }
};

displayScores();

backBtn.addEventListener("click", function () {
    location.href = "index.html";
});

clearBtn.addEventListener("click", function () {
    highScoresList.innerHTML = "";
    window.localStorage.clear();
});