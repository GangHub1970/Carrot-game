const ITEMSIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.items = document.querySelector(".game__items");
    this.itemsRect = this.items.getBoundingClientRect();

    this.CARROTCOUNT = carrotCount;
    this.BUGCOUNT = bugCount;
    this.remainCarrot = this.CARROTCOUNT;

    this.items.addEventListener("click", (event) => {
      this.onClick && this.onClick(event);
    });
  }

  onClickListener(onClick) {
    this.onClick = onClick;
  }

  createItems(element) {
    const x = randomNumber(0, this.itemsRect.width - ITEMSIZE);
    const y = randomNumber(0, this.itemsRect.height - ITEMSIZE);

    const item = document.createElement("img");
    item.setAttribute("src", `./img/${element}.png`);
    item.setAttribute("class", element);
    item.style.position = "absolute";
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    this.items.appendChild(item);
  }

  create() {
    for (let i = 0; i < this.CARROTCOUNT; i++) {
      this.createItems("carrot");
    }
    for (let i = 0; i < this.BUGCOUNT; i++) {
      this.createItems("bug");
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
