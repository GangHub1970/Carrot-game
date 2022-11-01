const game = document.querySelector(".game");
const controlBtn = document.querySelector(".control-btn");
const controlBtnShape = controlBtn.querySelector(".material-icons");
const items = document.querySelector(".game__items");
const itemsRect = items.getBoundingClientRect();
const timer = document.querySelector(".timer");
const count = document.querySelector(".count");
const popUp = document.querySelector(".pop-up");
const replayBtn = popUp.querySelector(".replay-btn");

const ITEMSIZE = 80;
const ITEMCOUNT = 5;

let started = false;
let gameTimer = undefined;
let remainTime = ITEMCOUNT;
let remainCarrot = ITEMCOUNT;

function onControl() {
  if (!started) {
    controlBtnShape.textContent = "stop";
    initGame();
    startTimer();
  } else {
    controlBtnShape.textContent = "play_arrow";
    showPopUp();
    stopTimer();
  }
  started = !started;
}

function initGame() {
  for (let i = 0; i < ITEMCOUNT; i++) {
    createItems("carrot");
  }
  for (let i = 0; i < ITEMCOUNT; i++) {
    createItems("bug");
  }
}

function onItemClick(event) {
  const itemType = event.target.className;
  if (itemType === "carrot") {
    event.target.remove();
    remainCarrot--;
    count.textContent = `${remainCarrot}`;
    if (remainCarrot === 0) {
      showPopUp();
      stopTimer();
    }
  } else if (itemType === "bug") {
    stopTimer();
    showPopUp();
  }
}

function onReplayClick() {
  items.innerHTML = "";
  initGame();
  remainCarrot = ITEMCOUNT;
  count.textContent = `${remainCarrot}`;
  remainTime = ITEMCOUNT;
  timer.textContent = `0:${remainTime}`;
  startTimer();
  hidePopUp();
  if (!started) {
    started = !started;
    controlBtnShape.textContent = "stop";
  }
}

function createItems(element) {
  const x = randomNumber(0, itemsRect.width - ITEMSIZE);
  const y = randomNumber(0, itemsRect.height - ITEMSIZE);

  const item = document.createElement("img");
  item.setAttribute("src", `./img/${element}.png`);
  item.setAttribute("class", `${element} item`);
  item.style.position = "absolute";
  item.style.left = `${x}px`;
  item.style.top = `${y}px`;
  items.appendChild(item);
}

function startTimer() {
  gameTimer = setInterval(() => {
    remainTime--;
    timer.textContent = `0:${remainTime}`;
    if (remainTime === 0) {
      showPopUp();
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
}

function showPopUp() {
  popUp.style.display = "flex";
  game.style.pointerEvents = "none";
}

function hidePopUp() {
  popUp.style.display = "none";
  game.style.pointerEvents = "auto";
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

controlBtn.addEventListener("click", onControl);
items.addEventListener("click", onItemClick);
replayBtn.addEventListener("click", onReplayClick);
