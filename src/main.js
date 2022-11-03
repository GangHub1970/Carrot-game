import * as sound from "./sound.js";
import PopUp from "./pop-up.js";
import Field from "./field.js";

const controlBtn = document.querySelector(".control-btn");
const controlBtnShape = document.querySelector(".control-btn .material-icons");
const timer = document.querySelector(".timer");
const count = document.querySelector(".count");

const gameFinishBanner = new PopUp();
gameFinishBanner.onClickListener(onReplayClick);

const gameField = new Field(5, 5);
gameField.onClickListener(onItemClick);

const DURATION = 5;
let started = false;
let gameTimer = undefined;
let remainTime = DURATION;

function onControl() {
  if (!started) {
    controlBtnShape.textContent = "stop";
    gameField.create();
    startTimer();
    sound.playBg();
  } else {
    controlBtnShape.textContent = "play_arrow";
    gameFinishBanner.show("stop");
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
      stopTimer();
      sound.playWin();
    }
  } else if (itemType === "bug") {
    stopTimer();
    gameFinishBanner.show("lose");
    sound.playBug();
    sound.stopBg();
  }
}

function onReplayClick() {
  gameField.items.innerHTML = "";
  gameField.create();
  sound.playBg();
  gameField.remainCarrot = gameField.CARROTCOUNT;
  count.textContent = `${gameField.CARROTCOUNT}`;
  remainTime = DURATION;
  timer.textContent = `0:${DURATION}`;
  startTimer();
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
      stopTimer();
      sound.playBug();
      sound.stopBg();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
}

controlBtn.addEventListener("click", onControl);
