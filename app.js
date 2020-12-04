const injector = document.querySelector("#injector");

// HTML

const small = [20, 20];
const med = [30, 30];
const large = [40, 40];

const slow = 5;
const meh = 10;
const fast = 15;

class Character {
  constructor(name, size, color, health, speed, isEnemy, loc = [20, 20]) {
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
    right: () => {
      this.loc[0] += this.speed;
      this.updateLoc();
    },
    down: () => {
      this.loc[1] += this.speed;
      this.updateLoc();
    },
    left: () => {
      this.loc[0] -= this.speed;
      this.updateLoc();
    },
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
  gainHealth() {
    this.health += 20;
    this.updateHealth();
  }
  loseHealth() {
    this.health -= 20;
    this.updateHealth();
  }
  spawn() {
    const character = document.createElement("div");
    const name = document.createElement("div");
    const healthBar = document.createElement("div");
    const healthBarInner = document.createElement("div");
    character.id = this.name;
    character.className = "character";
    character.style.width = this.size[0] + "px";
    character.style.height = this.size[1] + "px";
    character.style.left = this.loc[0] + "px";
    character.style.top = this.loc[1] + "px";
    character.style.backgroundColor = this.color;
    name.innerHTML = this.name;
    name.className = "name";
    name.style.height = "5px";
    name.style.position = "relative";
    name.style.top = "-20px";
    healthBar.style.height = "5px";
    healthBar.style.width = this.health + "px";
    healthBar.style.position = "relative";
    healthBar.style.top = "-30px";
    healthBar.style.backgroundColor = "white";
    healthBar.style.border = "solid 1px black";
    healthBar.className = "health-bar";
    healthBarInner.style.width = "100%";
    healthBarInner.style.height = "100%";
    healthBarInner.style.backgroundColor = "red";
    healthBarInner.className = "health-bar__inner";
    healthBar.append(healthBarInner);
    character.append(healthBar);
    character.append(name);
    injector.append(character);
  }
  updateLoc() {
    const character = document.querySelector(`#${this.name}`);
    character.style.left = this.loc[0] + "px";
    character.style.top = this.loc[1] + "px";
  }
  updateHealth() {
    const characterHealth = document.querySelector(
      `#${this.name} .health-bar__inner`
    );
    characterHealth.style.width = this.health + "px";
  }
}

const main = new Character("Ben", med, "red", 100, fast, false);
const secondary = new Character("Zach", large, "blue", 100, slow, false, [
  100,
  100,
]);

main.spawn();
main.walk.down();
secondary.spawn();
