export default class Carre {
  left = this.getRandomPosition();
  top = this.getRandomPosition();
  color = this.getRandomColor();

  getRandomColor(): string {
    return `rgb(${Math.random() * 25},${Math.random() * 255}, ${
      Math.random() * 255
    })`;
  }

  getRandomPosition(): string {
    return `${Math.random() * 100}%`;
  }

  createSquare(): HTMLElement {
    let square: HTMLElement = document.createElement("div");
    square.classList.add("mySuperRandomSquare");
    square.style.background = this.getRandomColor();
    square.style.left = this.getRandomPosition();
    square.style.top = this.getRandomPosition();
    return square;
  }
}
