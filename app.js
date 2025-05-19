let gameSequence = [];
let userSequence = [];

let start = false;
let level = 0;

let gameButtons = ["red", "yellow", "green", "purple"];

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let score = document.querySelector("#score");

document.addEventListener("keypress", function () {
  if (start == false) {
    console.log("Game started");
    start = true;
    levelUp();
  }
});

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = gameButtons[randomIndex];
  gameSequence.push(randomColor);
  console.log(gameSequence);
  flash(randomColor);
}

function flash(btn) {
  let button = document.getElementById(btn);
  button.classList.add("flashBtn");
  setTimeout(function () {
    button.classList.remove("flashBtn");
  }, 200);
}

let buttons = document.querySelectorAll(".btn");
for (item of buttons) {
  item.addEventListener("click", function () {
    let btn = this;
    let btnPressed = btn.getAttribute("id");
    flash(btnPressed);
    userSequence.push(btnPressed);
    checkAnswer(userSequence.length - 1);
  });
}

function checkAnswer(idx) {
  if (userSequence[idx] == gameSequence[idx]) {
    if (userSequence.length == gameSequence.length) {
      highestScore();
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over. Your score is <b>${
      level - 1
    }</b> <br> Please press any key to restart`;
    changeBodyColor();
    reset();
  }
}

function highestScore() {
  if (level > parseInt(score.innerText)) {
    score.innerText = level;
  }
}
function changeBodyColor() {
  let body = document.querySelector("body");
  body.style.backgroundColor = "red";
  setTimeout(function () {
    body.style.backgroundColor = "rgb(145, 183, 207)";
  }, 100);
}

function reset() {
  level = 0;
  start = false;
  gameSequence = [];
  userSequence = [];
}
