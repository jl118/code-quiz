// declared variables
var storedScores = JSON.parse(localStorage.getItem("userData"));
var highScoresList = document.querySelector("#high-scores-list");
var backBtn = document.querySelector("#back-btn");
var clearBtn = document.querySelector("#clear-btn");

// display high scores function
function displayScores() {
    if (storedScores !== null) {
        // creates an ordered list from the scores
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

//calls the displayScore function
displayScores();

// adds event listener and location for the back button
backBtn.addEventListener("click", function () {
    location.href = "index.html";
});

// clears the local storage and wipes the high score list
clearBtn.addEventListener("click", function () {
    highScoresList.innerHTML = "";
    window.localStorage.clear();
});