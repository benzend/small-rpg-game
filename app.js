//selector
const character = document.getElementById("character");
const htmlBody = document.getElementById("body");
const badGuys = document.getElementsByClassName("bad-guy");
const merchant = document.getElementById("merchant");
const fightOptionsBox = document.getElementById("fight-options");
const attack = document.getElementById("attack");
const run = document.getElementById("run");
const healthBar = document.getElementById("health-bar");
const enemyName = document.getElementsByClassName("enemy-name");
const enemyHealthBarMain = document.getElementsByClassName(
  "enemy-health-bar-border"
);
const enemyHealthBar = document.getElementsByClassName("enemy-health-bar");
const badGuyContainer = document.getElementsByClassName("bad-guy_container");
const food = document.getElementsByClassName("food");
const coins = document.getElementById("coin-amount");
const msg = document.getElementById("msg");
const merchantComment = document.getElementById("merchant-comment");
const store = document.getElementById("store-container");
const buyButton = document.getElementById("buy-btn");

//object constructor
function Character(name, attack, health, color) {
  this.name = name;
  this.attack = attack;
  this.health = health;
  this.color = color;
}

//objects
var warrior = new Character("warrior", 60, 40, "yellow");
var goblin = new Character("goblin", 20, 15, "green");
var averageJoe = new Character("average Joe", 35, 35, "pink");
var villager = new Character("villager", 35, 35, "blue");

//variables
var currentEnemy;

healthBar.style.width = "100%";

for (var i = 0; i < badGuys.length; i++) {
  enemyHealthBar[i].style.width = "100%";
}

//arrays
var merchantComments = ["hey", "pssst...", "come over here"];

//checkers
var badGuyMet = false;
var redeployOptions = true;
var optionsActive = false;

//event listeners
document.onkeydown = checkKey;

window.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

attack.addEventListener("click", function () {
  healthBar.style.width = parseInt(healthBar.style.width) - 20 + "%";
  enemyHealthBar[currentEnemy].style.width =
    parseInt(enemyHealthBar[currentEnemy].style.width) - 50 + "%";
  if (enemyHealthBar[currentEnemy].style.width === "0%") {
    enemyHealthBarMain[currentEnemy].style.visibility = "hidden";
    badGuys[currentEnemy].style.visibility = "hidden";
    fightOptionsBox.classList.remove("visible");
    coins.innerHTML++;
    optionsActive = false;
    badGuyMet = false;
  } else if (healthBar.style.width <= "0%") {
    fightOptionsBox.classList.remove("visible");
    coins.innerHTML = 0;
    optionsActive = false;
    badGuyMet = false;
    character.style.display = "none";
    msg.style.visibility = "visible";
  }
});

run.addEventListener("click", function () {
  fightOptionsBox.classList.remove("visible");
  optionsActive = false;
  setInterval(function () {
    if (redeployOptions) {
      badGuyMet = false;
    }
  }, 100);
});

buyButton.addEventListener("click", function () {
  if (healthBar.style.width != "100%" && coins.innerHTML != 0) {
    coins.innerHTML--;
    healthBar.style.width = parseInt(healthBar.style.width) + 20 + "%";
  } else if (coins.innerHTML == 0 || healthBar.style.width != "100%") {
    alert("You don't have any money or your health is already at 100%");
  }
});

//spawn functions
function spawnYou(object) {
  character.style.backgroundColor = object.color;
  character.style.visibility = "visible";
}

function spawnBadGuy(object) {
  for (var i = 0; i < badGuys.length; i++) {
    badGuys[i].style.backgroundColor = object.color;
    badGuys[i].style.visibility = object.visibility;
    badGuys[i].style.border = "red thin solid";
    enemyName[i].innerHTML = object.name;
  }
}

function spawnMerchant(object) {
  merchant.style.backgroundColor = object.color;
  merchant.style.visibility = "visible";
}

//movement functions
function checkKey(e) {
  e = e || window.event;

  if (optionsActive === false) {
    if (e.keyCode == "38") {
      moveUp();
    } else if (e.keyCode == "40") {
      moveDown();
    } else if (e.keyCode == "37") {
      moveLeft();
    } else if (e.keyCode == "39") {
      moveRight();
    }
  }
}

function moveLeft() {
  character.style.left = parseInt(character.offsetLeft - 15) + "px";
  /*console.log("left: " + character.offsetLeft + " top: " + character.offsetTop);*/
}

function moveRight() {
  character.style.left = parseInt(character.offsetLeft + 15) + "px";
  /*console.log("left: " + character.offsetLeft + " top: " + character.offsetTop);*/
}

function moveUp() {
  character.style.top = character.offsetTop - 15 + "px";
  /*console.log("left: " + character.offsetLeft + " top: " + character.offsetTop);*/
}

function moveDown() {
  character.style.top = character.offsetTop + 15 + "px";
  /*console.log("left: " + character.offsetLeft + " top: " + character.offsetTop);*/
}

var randomIndex = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return index;
};

//function for checking if your main character makes contact with enemies
//also spawns an option box for attacking or running
setInterval(function () {
  for (var i = 0; i < badGuys.length; i++) {
    if (
      badGuys[i].offsetParent.offsetTop + 30 > character.offsetTop - 30 &&
      badGuys[i].offsetParent.offsetTop + 30 < character.offsetTop + 30 &&
      badGuys[i].offsetParent.offsetLeft + 20 > character.offsetLeft - 30 &&
      badGuys[i].offsetParent.offsetLeft + 20 < character.offsetLeft + 30
    ) {
      badGuyMet = true;
      if (badGuyMet && redeployOptions) {
        fightOptionsBox.classList.add("visible");
        redeployOptions = false;
        optionsActive = true;
        console.log(i);
        currentEnemy = i;
      }
      return;
    }
  }
  badGuyMet = false;
  redeployOptions = true;
}, 50);

setInterval(function () {
  for (var i = 0; i < food.length; i++) {
    if (
      food[i].offsetTop > character.offsetTop - 30 &&
      food[i].offsetTop < character.offsetTop + 30 &&
      food[i].offsetLeft > character.offsetLeft - 30 &&
      food[i].offsetLeft < character.offsetLeft + 30
    ) {
      if (healthBar.style.width != "100%") {
        food[i].style.display = "none";
        healthBar.style.width = parseInt(healthBar.style.width) + 20 + "%";
      }
    }
  }
}, 50);

setInterval(function () {
  if (
    merchant.offsetTop > character.offsetTop - 30 &&
    merchant.offsetTop < character.offsetTop + 30 &&
    merchant.offsetLeft > character.offsetLeft - 30 &&
    merchant.offsetLeft < character.offsetLeft + 30
  ) {
    store.classList.add("appear");
  } else {
    store.classList.remove("appear");
  }
}, 100);

setInterval(function () {
  var merchantSays = merchantComments[randomIndex(merchantComments)];
  merchantComment.innerHTML = merchantSays;
  merchantComment.classList.add("appear");
  setTimeout(function () {
    merchantComment.classList.remove("appear");
  }, 1500);
}, 10000);

spawnMerchant(averageJoe);
spawnYou(villager);
spawnBadGuy(goblin);
