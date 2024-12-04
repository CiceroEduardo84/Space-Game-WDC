const spaceContainer = document.querySelector(".spaceContainer");
const spaceShip = document.querySelector(".spaceship");
const playerName = document.querySelector(".playerName");
const life = document.querySelector(".life");
const score = document.querySelector(".score");
const gameOverButton = document.querySelector(".gameOver button");

const spaceContainerWidth = spaceContainer.offsetWidth;
const spaceContainerHeigth = spaceContainer.offsetHeight;

const spaceshipWidth = spaceShip.offsetWidth;
const spaceshipHeigth = spaceShip.offsetHeight;

const spaceshipSpeed = 10; // px to upper
const shootSpeed = 10; // per second
const spaceshipDamage = 25; // -25 per shot
const timeToEndSpecialShot = 30 * 1000;

let canShoot = true;
let specialShotIsActive = false;
let shoot = 25; // -25 enemy life

let positionX = 0;
let positionY = 0;
let moveX = spaceContainerWidth / 2;
let moveY = 0;

let enemiesDifficultyLevel = 1;
let pointsToIncrementDifficultyLevel = 1000; //each 1000 points
let enemyX = Math.random() * spaceContainerWidth;
let enemyY = 100;

function spaceshipeMove() {
  moveX += positionX * spaceshipSpeed;
  moveY += positionY * spaceshipSpeed;

  const discountScreenLimit = spaceshipWidth / 2;

  moveX = Math.max(
    discountScreenLimit,
    Math.min(moveX, spaceContainerWidth - discountScreenLimit)
  );

  moveY = Math.max(
    -discountScreenLimit,
    Math.min(
      moveY,
      spaceContainerHeigth - spaceshipHeigth - discountScreenLimit
    )
  );

  spaceShip.style.left = moveX - discountScreenLimit + "px";
  spaceShip.style.bottom = moveY + discountScreenLimit + "px";

  requestAnimationFrame(spaceshipeMove);
}

function creatShot(className = "shot") {
  if (canShoot) {
    const shot = document.createElement("div");
    shot.classList.add(className);

    if (specialShotIsActive) {
      shot.classList.add("specialShot");

      const shootSound = new Audio("../audios/shootSpecial.mp3");
      shootSound.volume = 0.3;
      shootSound.play();

      shot.style.left = moveX + "px";
      shot.style.bottom = moveY + spaceshipHeigth + spaceshipHeigth / 8 + "px";
    } else {
      const shootSound = new Audio("../audios/shoot.mp3");
      shootSound.volume = 1;
      shootSound.play();

      shot.style.left = moveX + "px";
      shot.style.bottom = moveY + spaceshipHeigth + spaceshipHeigth / 4 + "px";
    }

    spaceContainer.appendChild(shot);

    canShoot = false;

    setTimeout(() => {
      canShoot = true;
    }, 1000 / shootSpeed);
  }
}

class EnemySpaceship {
  constructor(enemyNumber = 1, src, alt, className) {
    this.enemyNumber = enemyNumber;
    this.life = enemyNumber == 1 ? 100 : enemyNumber == 2 ? 300 : 600;
    this.score = enemyNumber == 1 ? 250 : enemyNumber == 2 ? 500 : 1000;
    this.damage = enemyNumber == 1 ? 20 : enemyNumber == 2 ? 30 : 50;
    this.flyCategory = Math.random() * 6 - 3;

    this.x = 0;
    this.y = 0;

    this.offScreenTopElementDiscount = 200; // px

    this.#createElement(src, alt, className);
  }

  #createElement(src, alt, className) {
    this.element = document.createElement("img");

    this.element.src = src;
    this.element.alt = alt;
    this.element.className = className;

    this.element.style.position = "absolute";
    this.element.style.top = `-${this.offScreenTopElementDiscount}px`; //top: -200px

    document.querySelector(".enemies").appendChild(this.element);
  }
}

function createEnemies() {
  enemiesDifficultyLevel =
    score == 0 ? 1 : Math.ceil(score / pointsToIncrementDifficultyLevel);

  const delayIntervalTime = Math.max(
    500,
    Math.random() * 1000 + 1000 / enemiesDifficultyLevel
  );

  setInterval(() => {
    let randomEnemyType = Math.ceil(Math.random() * 100);

    if (randomEnemyType <= 50) {
      randomEnemyType = 1; //50%
    } else if (randomEnemyType <= 80) {
      randomEnemyType = 2; //30%
    } else if (randomEnemyType <= 95) {
      randomEnemyType = 3; //15%
    } else if (randomEnemyType <= 100) {
      //5%
    }

      new EnemySpaceship(
        randomEnemyType,
        `../images/enemy${randomEnemyType}.gif`,
        `enemy${randomEnemyType}`,
        `enemy${randomEnemyType}`
      )
  }, delayIntervalTime);
}

function spaceshipShootRemove() {
  const shoots = document.querySelectorAll(".shot");

  shoots.forEach((shot) => {
    shot.addEventListener("animationend", () => {
      shot.remove();
    });
  });
}

function gameControls(key) {
  switch (key.code) {
    case "Space":
      creatShot();
      spaceshipShootRemove();
      break;

    case "ArrowUp":
    case "KeyW":
      positionY = 1;
      break;

    case "ArrowDown":
    case "KeyS":
      positionY = -1;
      break;

    case "ArrowLeft":
    case "KeyA":
      positionX = -1;
      spaceShip.style.transform = "rotate(-15deg)";
      break;

    case "ArrowRight":
    case "KeyD":
      positionX = 1;
      spaceShip.style.transform = "rotate(15deg)";
      break;

    default:
      break;
  }
}

function gameControlsCancel(key) {
  switch (key.code) {
    case "Space":
      break;

    case "ArrowUp":
    case "KeyW":
    case "ArrowDown":
    case "KeyS":
      positionY = 0;
      break;

    case "ArrowLeft":
    case "KeyA":
    case "ArrowRight":
    case "KeyD":
      positionX = 0;
      spaceShip.style.transform = "rotate(0deg)";
      break;

    default:
      break;
  }
}

function setPLayerName() {
  playerName.innerHTML = localStorage.getItem("@spaceshipGame:playerName");
}

document.addEventListener("keydown", gameControls);
document.addEventListener("keyup", gameControlsCancel);

setPLayerName();
spaceshipeMove();
createEnemies();
