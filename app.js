const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 30, 30);

class Character {
  constructor(name, size, color, health, speed) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.health = health;
    this.speed = speed;
  }
  walk = {
    up: () => {},
    right: () => {},
    down: () => {},
    left: () => {},
  };
  run = {
    up: () => {},
    right: () => {},
    down: () => {},
    left: () => {},
  };
  attack = {
    light: () => {},
    heavy: () => {},
    ranged: () => {},
  };
}

const main = new Character("Ben", "large", "red", 100, "fast");

main.attack.light();
main.walk.up();
