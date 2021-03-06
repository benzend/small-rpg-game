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
    weapon = "none",
    aimDirection = "right"
  ) {
    this.name = name;
    this.size = size;
    this.color = color;
    this.health = health;
    this.speed = speed;
    this.isEnemy = isEnemy;
    this.loc = loc;
    this.weapon = weapon;
    this.aimDirection = aimDirection;
  }
  walk = {
    up: () => {
      this.loc[1] -= this.speed;
      this.updateLoc();
      this.changeAimDirection.up();
    },
    right: () => {
      this.loc[0] += this.speed;
      this.updateLoc();
      this.changeAimDirection.right();
    },
    down: () => {
      this.loc[1] += this.speed;
      this.updateLoc();
      this.changeAimDirection.down();
    },
    left: () => {
      this.loc[0] -= this.speed;
      this.updateLoc();
      this.changeAimDirection.left();
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
  changeAimDirection = {
    up: () => {
      this.aimDirection = "up";
    },
    right: () => {
      this.aimDirection = "right";
    },
    down: () => {
      this.aimDirection = "down";
    },
    left: () => {
      this.aimDirection = "left";
    },
  };
  actions = {
    shoot: () => {
      const character = document.querySelector(`#${this.name}`);
      const bullet = document.createElement("div");
      // Added this.name as classlist so that the bullets
      // that the character shoots are 'attached' to that character
      bullet.className = `bullet object ${this.name}`;
      bullet.style.borderRadius = "50%";
      bullet.style.height = "10px";
      bullet.style.width = "10px";
      bullet.style.top = character.style.top;
      bullet.style.left = character.style.left;
      bullet.style.backgroundColor = this.color;
      bullet.style.position = "absolute";
      injector.append(bullet);

      // It's what "Animates" the bullet while
      // it is checking to see if the bullet is
      // making contact
      if (this.aimDirection === "right") {
        bullet.animate(
          [{ left: this.loc[0] + "px" }, { left: this.loc[0] + 1000 + "px" }],
          {
            duration: 1000,
            iterations: 1,
          }
        );
      } else if (this.aimDirection === "left") {
        bullet.animate(
          [{ left: this.loc[0] + "px" }, { left: this.loc[0] - 1000 + "px" }],
          {
            duration: 1000,
            iterations: 1,
          }
        );
      } else if (this.aimDirection === "up") {
        bullet.animate(
          [{ top: this.loc[1] + "px" }, { top: this.loc[1] - 1000 + "px" }],
          {
            duration: 1000,
            iterations: 1,
          }
        );
      } else if (this.aimDirection === "down") {
        bullet.animate(
          [{ top: this.loc[1] + "px" }, { top: this.loc[1] + 1000 + "px" }],
          {
            duration: 1000,
            iterations: 1,
          }
        );
      }
      const sending = setInterval(() => {
        this.checkIfBulletHit();
      }, 20);
      setTimeout(() => {
        bullet.remove();
        clearInterval(sending);
      }, 1000);
    },
  };
  gainHealth() {
    this.health += 20;
    this.updateHealth();
  }
  loseHealth() {
    this.health -= 0.1;
    this.updateHealth();
    if (this.health < 1) this.die();
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
      if (!node.classList.contains("bullet")) {
        objects.push(node);
      }
    });
    // console.log(objects);
    bullets.forEach((bullet) => {
      // Parameters (Hitbox)
      const bulletLeft = bullet.offsetLeft;
      const bulletTop = bullet.offsetTop;
      const bulletWidth = parseInt(bullet.style.width.replace("px", ""));
      const bulletHeight = parseInt(bullet.style.height.replace("px", ""));
      const bulletRight = bulletLeft + bulletWidth;
      const bulletBottom = bulletTop + bulletHeight;
      objects.forEach((obj) => {
        // Parameters (Hitbox)
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
          // console.log("the bullet is making contact with " + obj.id);
          if (obj.id === "Dan" && !bullet.classList.contains("Dan")) {
            enemy.loseHealth();
          }
          if (obj.id === "Ben" && !bullet.classList.contains("Ben")) {
            main.loseHealth();
          }
          if (obj.id === "Zach" && !bullet.classList.contains("Zach")) {
            secondary.loseHealth();
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
        // console.log(
        //   `${this.name} is making contact with ${object.id || "bullets"}`
        // );
        if (object.classList.contains("food")) {
          this.gainHealth();
          const food = document.querySelector(`#${object.id}`);
          // console.log(this.health);
          food.remove();
        }
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

class Food {
  constructor(id, size, loc) {
    this.id = id;
    this.size = size;
    this.loc = loc;
  }
  madeContact() {
    const characters = document.querySelectorAll(".character");
    characters.forEach((character) => {
      const characterLeft = parseInt(character.style.left.replace("px", ""));
      const characterTop = parseInt(character.style.top.replace("px", ""));
      const characterWidth = parseInt(character.style.width.replace("px", ""));
      const characterHeight = parseInt(
        character.style.height.replace("px", "")
      );
      const characterRight = characterLeft + characterWidth;
      const characterBottom = characterTop + characterHeight;

      if (
        currentCharacBottom >= intTop &&
        currentCharacTop <= intBottom &&
        currentCharacRight >= intLeft &&
        currentCharacLeft <= intRight &&
        this.name !== character.textContent
      ) {
        // console.log(
        //   `${this.name} is making contact with ${object.id || "bullets"}`
        // );
      }
    });
  }
  spawn() {
    const food = document.createElement("div");
    food.id = this.id;
    food.className = "food object";
    food.style.position = "absolute";
    food.style.width = this.size[0] + "px";
    food.style.height = this.size[1] + "px";
    food.style.left = this.loc[0] + "px";
    food.style.top = this.loc[1] + "px";
    food.style.backgroundColor = "lightGreen";
    injector.append(food);
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

const main = new Character("Ben", med, "red", 100, slow, false, [200, 200]);
const secondary = new Character("Zach", large, "blue", 100, slow, false, [
  100,
  100,
]);
const enemy = new Character("Dan", large, "green", 200, meh, true, [300, 100]);
const food1 = new Food("food1", small, [300, 300]);
const food2 = new Food("food2", small, [300, 200]);
const food3 = new Food("food3", small, [100, 200]);

main.spawn();
secondary.spawn();
enemy.spawn();
food1.spawn();
food2.spawn();
food3.spawn();

// enemy.actions.shoot();
// secondary.actions.shoot();

setInterval(() => {
  const zach = document.querySelector("#Zach");
  if (zach) {
    const random = Math.floor(Math.random() * 9);
    if (random === 0) {
      secondary.walk.up();
    } else if (random === 1) {
      secondary.walk.left();
    } else if (random === 2) {
      secondary.walk.down();
    } else if (random === 3) {
      secondary.walk.right();
    } else if (random === 4) {
      secondary.actions.shoot();
    } else if (random === 5) {
      secondary.walk.up();
      secondary.walk.right();
    } else if (random === 6) {
      secondary.walk.right();
      secondary.walk.down();
    } else if (random === 7) {
      secondary.walk.down();
      secondary.walk.left();
    } else if (random === 8) {
      secondary.walk.left();
      secondary.walk.up();
    }
  }
}, 100);

setInterval(() => {
  const dan = document.querySelector("#Dan");
  if (dan) {
    const random = Math.floor(Math.random() * 9);
    if (random === 0) {
      enemy.walk.up();
    } else if (random === 1) {
      enemy.walk.left();
    } else if (random === 2) {
      enemy.walk.down();
    } else if (random === 3) {
      enemy.walk.right();
    } else if (random === 4) {
      enemy.actions.shoot();
    } else if (random === 5) {
      enemy.walk.up();
      enemy.walk.right();
    } else if (random === 6) {
      enemy.walk.right();
      enemy.walk.down();
    } else if (random === 7) {
      enemy.walk.down();
      enemy.walk.left();
    } else if (random === 8) {
      enemy.walk.left();
      enemy.walk.up();
    }
  }
}, 100);
