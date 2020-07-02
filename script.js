const gameContainer = document.getElementById("game");
const body = document.querySelector("body");
const best = document.querySelector("#best");
let counterValue = document.querySelector("#counter");
let tryCounter = 0;

const COLORS = [
    "rinne",
    "forsberg",
    "grimaldi",
    "ellis",
    "ekholm",
    "johansen",
    "rinne",
    "forsberg",
    "grimaldi",
    "ellis",
    "ekholm",
    "johansen"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");
        const cardBack = document.createElement("img");
        cardBack.src = "img/logo.jpg";
        cardBack.classList.add("backFace");
        const cardFront = document.createElement("img");
        cardFront.src = `img/${color}.jpg`;
        cardFront.classList.add("frontFace");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add("memoryCard");

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
        newDiv.append(cardFront);
        newDiv.append(cardBack);
    }
}

let cardIsFlipped = false;
let cardOne, cardTwo;
let matchCounter = 0;
let boardLock = false;

// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    if (boardLock) {
        return;
    }
    if (this == cardOne) {
        return;
    }
    if (!cardIsFlipped) {
        event.target.parentElement.classList.toggle("flip");
        cardIsFlipped = true;
        cardOne = this;
    } else {
        cardTwo = this;
        event.target.parentElement.classList.toggle("flip");
        cardIsFlipped = false;
        boardLock = true;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    boardLock = false;
    if (cardOne.firstChild.src === cardTwo.firstChild.src) {
        cardOne.removeEventListener("click", handleCardClick);
        cardTwo.removeEventListener("click", handleCardClick);
        carOne = null;
        cardTwo = null;
        tryCounter++;
        counterValue.innerText = `Tries: ${tryCounter}`;
        matchCounter++;
    } else {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        cardOne = null;
        cardTwo = null;
        tryCounter++;
        counterValue.innerText = `Tries: ${tryCounter}`;
    }
    if (matchCounter == COLORS.length / 2) {
        const horn = document.querySelector('audio');
        const youWin = document.querySelector("#winner");
        const resetButton = document.querySelector("button");
        horn.volume = .3;
        horn.play();
        youWin.style.visibility = "visible";
        resetButton.addEventListener("click", function() {
            location.reload();
        });
        if (tryCounter < localStorage.bestScore || localStorage.bestScore == undefined) {
            localStorage.setItem("bestScore", tryCounter);
        }
    }
}

// when the DOM loads
if (localStorage.bestScore) {
    best.innerText = `Best: ${localStorage.bestScore} `;
    createDivsForColors(shuffledColors);
} else {
    createDivsForColors(shuffledColors);
}