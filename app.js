const injector = document.querySelector("#injector");

const small = [20, 20];
const med = [30, 30];
const large = [40, 40];

const slow = 5;
const meh = 10;
const fast = 15;

class Character {
  constructor(name, size, color, health, speed, isEnemy, loc) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.health = health;
    this.speed = speed;
    this.isEnemy = isEnemy;
    this.loc = loc;
  }
  walk = {
    up: () => {
      this.loc[1] -= this.speed;
      this.updateLoc();
    },
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
  spawn() {}
  updateLoc() {}
}

const main = new Character("Ben", med, "red", 100, fast, false, [20, 20]);
