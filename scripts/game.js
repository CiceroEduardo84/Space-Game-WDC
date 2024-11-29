const spaceContainer = document.querySelector(".spaceContainer");
const spaceShip = document.querySelector(".spaceship");
const playerName = document.querySelector(".playerName");
const life = document.querySelector(".life");
const score = document.querySelector(".score");
const gameOverButton = document.querySelector(".gameOver button");

const spaceContainerWidth = spaceContainer.offsetWidth;
const spaceContainerHeigth = spaceContainer.offsetHeigth;
const spaceshipWidth = spaceShip.offsetWidth;
const spaceshipHeigth = spaceShip.offsetHeigth;

const spaceshipSpeed = 10; // px to upper

let positionX = 0;
let positionY = 0;
let moveX = spaceContainerWidth / 2;
let moveY = 0;

function spaceshipeMove() {
  moveX += positionX * spaceshipSpeed;
  moveY += positionY * spaceshipSpeed;

  spaceShip.style.left = moveX + "px";
  spaceShip.style.bottom = moveY + "px";

  requestAnimationFrame(spaceshipeMove);
}

function gameControls(key) {
  switch (key.code) {
    case "Space":
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
