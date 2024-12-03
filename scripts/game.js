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

function gameControls(key) {
  switch (key.code) {
    case "Space":
      creatShot();
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

function spaceshipShootRemove() {
  const shoots = document.querySelectorAll(".shot");

  shoots.forEach((shot) => {
    shot.addEventListener("animationend", () => {
      shot.remove();
    });
  });

  requestAnimationFrame(spaceshipShootRemove);
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
spaceshipShootRemove();
