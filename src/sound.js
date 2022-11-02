const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

export function playBg() {
  bgSound.currentTime = 0;
  playSound(bgSound);
}

export function stopBg() {
  stopSound(bgSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playCarrot() {
  playSound(carrotSound);
}

export function playWin() {
  playSound(winSound);
}

export function playAlert() {
  playSound(alertSound);
}

function playSound(element) {
  element.play();
}

function stopSound(element) {
  element.pause();
}
