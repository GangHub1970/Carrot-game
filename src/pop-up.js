export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up__text");
    this.replayBtn = document.querySelector(".replay-btn");
    this.replayBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
      // onGamePointer();
    });
  }

  onClickListener(onClick) {
    this.onClick = onClick;
  }

  show(reason) {
    this.popUp.classList.remove("hidden");
    // hideGamePointer();
    switch (reason) {
      case "win":
        this.popUpText.textContent = "YOU WIN 🎉";
        break;
      case "lose":
        this.popUpText.textContent = "YOU LOST 💩";
        break;
      case "stop":
        this.popUpText.textContent = "Replay?";
        break;
    }
  }

  hide() {
    this.popUp.classList.add("hidden");
    // onGamePointer();
  }
}

// function hideGamePointer() {
//   game.style.pointerEvents = "none";
// }

// function onGamePointer() {
//   game.style.pointerEvents = "auto";
// }
