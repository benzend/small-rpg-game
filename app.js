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
      bullet.className = "bullet object";
      bullet.style.borderRadius = "50%";
      bullet.style.height = "10px";
      bullet.style.width = "10px";
      bullet.style.top = character.style.top;
      bullet.style.left = character.style.left;
      bullet.style.backgroundColor = this.color;
      bullet.style.position = "absolute";
      injector.append(bullet);
      let distance =
        parseInt(character.style.left.replace("px", "")) +
        parseInt(bullet.style.width.replace("px", "")) / 2;

      // It's what "Animates" the bullet
      const sending = setInterval(() => {
        distance += 10;
        bullet.style.left = distance + "px";
        this.checkIfBulletHit();
      }, 20);
      setTimeout(() => {
        bullet.remove();
        clearInterval(sending);
      }, 2000);
    },
  };
  gainHealth() {
    this.health += 20;
    this.updateHealth();
  }
  loseHealth() {
    this.health -= 5;
    this.updateHealth();
    if (this.health < 1) {
      this.die();
    }
  }
  die() {
    const character = document.querySelector(`#${this.name}`);
    character.remove();
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
  checkIfBulletHit() {
    const bullets = document.querySelectorAll(".bullet");
    const objectsNodeList = document.querySelectorAll(".object");
    const objects = [];
    objectsNodeList.forEach((node) => {
      if (!node.classList.contains("bullet") && node.id !== "Ben") {
        objects.push(node);
      }
    });
    bullets.forEach((bullet) => {
      const bulletLeft = parseInt(bullet.style.left.replace("px", ""));
      const bulletTop = parseInt(bullet.style.top.replace("px", ""));
      const bulletWidth = parseInt(bullet.style.width.replace("px", ""));
      const bulletHeight = parseInt(bullet.style.height.replace("px", ""));
      const bulletRight = bulletLeft + bulletWidth;
      const bulletBottom = bulletTop + bulletHeight;
      objects.forEach((obj) => {
        const objLeft = parseInt(obj.style.left.replace("px", ""));
        const objTop = parseInt(obj.style.top.replace("px", ""));
        const objWidth = parseInt(obj.style.width.replace("px", ""));
        const objHeight = parseInt(obj.style.height.replace("px", ""));
        const objRight = objLeft + objWidth;
        const objBottom = objTop + objHeight;

        // console.log(
        //   `Bullet: \nLeft: ${bulletLeft} \nRight: ${bulletRight} \nTop: ${bulletTop} \nBottom: ${bulletBottom} \n \nObject: ${obj.textContent} \nLeft: ${objLeft} \nRight: ${objRight} \nTop: ${objTop} \nBottom: ${objBottom} `
        // );

        if (
          bulletBottom >= objTop &&
          bulletTop <= objBottom &&
          bulletRight >= objLeft &&
          bulletLeft <= objRight
        ) {
          console.log("the bullet is making contact with " + obj.id);
          if (obj.id === "Zach") {
            secondary.loseHealth();
          }
          if (obj.id === "Dan") {
            enemy.loseHealth();
          }
        }
      });
    });
  }
  isContacted() {
    const objects = document.querySelectorAll(".object");
    objects.forEach((object) => {
      const left = object.style.left.replace("px", "");
      const top = object.style.top.replace("px", "");
      const width = object.style.width.replace("px", "");
      const height = object.style.height.replace("px", "");
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
        this.name !== object.textContent
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
