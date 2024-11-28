const inpuName = document.querySelector("#name");
const newGameForm = document.querySelector("#newGameForm");
const buttonRank = document.querySelector(".buttonRank");

function handleSubmitNewGame() {
  event.preventDefault();
  localStorage.setItem("@spaceshipGame:playerName", inpuName.value);
}

newGameForm.addEventListener("submit", handleSubmitNewGame);
