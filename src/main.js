import * as sound from "./sound.js";
import PopUp from "./pop-up.js";
import Field from "./field.js";

const game = document.querySelector(".game");
const controlBtn = document.querySelector(".control-btn");
const controlBtnShape = controlBtn.querySelector(".material-icons");
const timer = document.querySelector(".timer");
const count = document.querySelector(".count");

const gameFinishBanner = new PopUp();
gameFinishBanner.onClickListener(onReplayClick);

const gameField = new Field();
gameField.onClickListener(onItemClick);

let started = false;
let gameTimer = undefined;
let remainTime = gameField.ITEMCOUNT;

function onControl() {
  if (!started) {
    controlBtnShape.textContent = "stop";
    gameField.create();
    startTimer();
    sound.playBg();
  } else {
    controlBtnShape.textContent = "play_arrow";
    gameFinishBanner.show("stop");
    hideGamePointer();
    stopTimer();
    sound.playAlert();
    sound.stopBg();
  }
  started = !started;
}

function onItemClick(event) {
  const itemType = event.target.className;
  if (itemType === "carrot") {
    event.target.remove();
    gameField.remainCarrot--;
    count.textContent = `${gameField.remainCarrot}`;
    sound.playCarrot();
    if (gameField.remainCarrot === 0) {
      gameFinishBanner.show("win");
      hideGamePointer();
      stopTimer();
      sound.playWin();
    }
  } else if (itemType === "bug") {
    stopTimer();
    gameFinishBanner.show("lose");
    hideGamePointer();
    sound.playBug();
    sound.stopBg();
  }
}

function onReplayClick() {
  gameField.items.innerHTML = "";
  gameField.create();
  sound.playBg();
  gameField.remainCarrot = gameField.ITEMCOUNT;
  count.textContent = `${gameField.remainCarrot}`;
  remainTime = gameField.ITEMCOUNT;
  timer.textContent = `0:${remainTime}`;
  startTimer();
  onGamePointer();
  if (!started) {
    started = !started;
    controlBtnShape.textContent = "stop";
  }
}

function startTimer() {
  gameTimer = setInterval(() => {
    remainTime--;
    timer.textContent = `0:${remainTime}`;
    if (remainTime === 0) {
      gameFinishBanner.show("lose");
      hideGamePointer();
      stopTimer();
      sound.playBug();
      sound.stopBg();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
}

function hideGamePointer() {
  game.style.pointerEvents = "none";
}

function onGamePointer() {
  game.style.pointerEvents = "auto";
}

controlBtn.addEventListener("click", onControl);
