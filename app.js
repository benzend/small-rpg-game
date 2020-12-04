const canvas = document.querySelector("canvas");
// const ctx = canvas.getContext("2d");
// ctx.fillStyle = "green";
// ctx.fillStyle = "red";
// ctx.fillRect(20, 20, 100, 100);
// ctx.fillRect(10, 10, 30, 30);

const small = [20, 20];
const med = [30, 30];
const large = [40, 40];

class Character {
  constructor(name, size, color, health, speed, isEnemy) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.health = health;
    this.speed = speed;
    this.isEnemy = isEnemy;
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
  spawn() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(20, 20, this.size[0], this.size[1]);
  }
}

const main = new Character("Ben", med, "red", 100, "fast", false);

// main.attack.light();
// main.walk.up();

main.spawn();
