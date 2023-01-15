alert("If you don't hear any button sounds, please check your browser's settings and allow sound for this page.");

let buttonColors = ["red", "blue", "green", "yellow"];
let gameStarted = false;
let gamePattern = [];
let userPattern = [];
let level = 0;

// When any key is pressed, start the game
$(document).keydown(function () {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();

        gameStarted = true;
    }
});

// Check which button is pressed
$(".btn").click(function (event) {
    let userColor = event.target.id;
    userPattern.push(userColor);

    animatePress(userColor);
    playSound(userColor);

    if(gameStarted) {
        checkAnswer(userPattern.length - 1);
    }
});

// Animate the button press
function animatePress(color) {
    let button = $("#" + color);
    button.addClass("pressed");
    setTimeout(() => button.removeClass("pressed"), 100);
}

// Animate the body
function animateBody(state) {
    let body = $("body");
    body.addClass(state);
    setTimeout(() => body.removeClass(state), 500);
}

// Start new game
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

// Play the sound of the button
function playSound(color) {
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play().then(() => console.log("Playing " + color));
}

// Generate a random color and add it to the game pattern
function nextSequence() {
    userPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    animatePress(randomColor);
    playSound(randomColor);
}

// Check if the user's answer is correct
function checkAnswer(currentLevel) {
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userPattern.length === gamePattern.length) {
            playSound("success");
            animateBody("level-up");

            setTimeout(() => nextSequence(), 900);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");
        animateBody("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
