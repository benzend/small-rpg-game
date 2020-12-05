const injector = document.querySelector("#injector");
const body = document.querySelector("body");

// Global Variables
const small = [20, 20];
const med = [30, 30];
const large = [40, 40];

const slow = 5;
const meh = 10;
const fast = 15;

// Event Listeners
window.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      // Prevents arrow keys and space from messing with the page
      e.preventDefault();
    }
  },
  false
);

document.onkeydown = checkKeyHandler;

// Constructor
class Character {
  constructor(
    name,
    size,
    color,
    health,
    speed,
    isEnemy,
    loc = [20, 20],
    weapon = "none"
  ) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.health = health;
    this.speed = speed;
    this.isEnemy = isEnemy;
    this.loc = loc;
    this.weapon = weapon;
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
    up: () => {
      this.loc[1] -= this.speed * 1.4;
      this.updateLoc();
    },
    right: () => {
      this.loc[0] += this.speed * 1.4;
      this.updateLoc();
    },
    down: () => {
      this.loc[1] += this.speed * 1.4;
      this.updateLoc();
    },
    left: () => {
      this.loc[0] -= this.speed * 1.4;
      this.updateLoc();
    },
  };
  actions = {
    shoot: () => {
      const character = document.querySelector("#Ben");
      const bullet = document.createElement("div");
      bullet.className = "bullet";
      bullet.style.borderRadius = "50%";
      bullet.style.height = "5px";
      bullet.style.width = "5px";
      bullet.style.backgroundColor = this.color;
      bullet.style.position = "relative";
      character.append(bullet);
      function yeet() {
        const bullets = document.querySelectorAll(".bullet");
        let distance = 0;
        console.log(bullets);
        bullets.forEach((b) => {
          const interval = setInterval(() => {
            b.style.left = distance + "px";
            distance += 10;
          }, 10);

          setTimeout(() => {
            clearInterval(interval);
          }, 1000);
        });
      }
      yeet();
    },
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
    character.className = "character object";
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
    this.isContacted();
  }
  isContacted() {
    const characters = document.querySelectorAll(".object");
    characters.forEach((character) => {
      const left = character.style.left.replace("px", "");
      const top = character.style.top.replace("px", "");
      const width = character.style.width.replace("px", "");
      const height = character.style.height.replace("px", "");
      const intLeft = parseInt(left);
      const intTop = parseInt(top);
      const intWidth = parseInt(width);
      const intRight = intLeft + intWidth;
      const intHeight = parseInt(height);
      const currentCharacLeft = this.loc[0];
      const currentCharacTop = this.loc[1];
      const currentCharacWidth = this.size[0];
      const currentCharacHeight = this.size[1];
      const currentCharacRight = currentCharacLeft + currentCharacWidth;
      const currentCharacBottom = currentCharacTop + currentCharacHeight;
      const intBottom = intTop + intHeight;

      if (
        currentCharacBottom >= intTop &&
        currentCharacTop <= intBottom &&
        currentCharacRight >= intLeft &&
        currentCharacLeft <= intRight &&
        this.name !== character.textContent
      ) {
        console.log("main is making contact");
      }
    });
  }
  updateHealth() {
    const characterHealth = document.querySelector(
      `#${this.name} .health-bar__inner`
    );
    characterHealth.style.width = this.health + "px";
  }
}

function checkKeyHandler(e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    main.walk.up();
  } else if (e.keyCode == "40") {
    main.walk.down();
  } else if (e.keyCode == "37") {
    main.walk.left();
  } else if (e.keyCode == "39") {
    main.walk.right();
  } else if (e.keyCode == "70") {
    main.actions.shoot();
  }
}

const main = new Character("Ben", med, "red", 100, slow, false);
const secondary = new Character("Zach", large, "blue", 100, slow, false, [
  100,
  100,
]);

const enemy = new Character("Dan", large, "green", 200, slow, true, [100, 500]);

main.spawn();
main.walk.down();
secondary.spawn();
enemy.spawn();
