let playerOneInput = document.getElementById("playerOne");
let playerTwoInput = document.getElementById("playerTwo");
let markSelect = document.getElementById("markSelect");
let cells = document.querySelectorAll(".cell");
let startGameButton = document.getElementById("startGame");
let gameResult = document.getElementById("gameResult");
let playerOneWins = document.getElementById("playerOneWins");
let playerTwoWins = document.getElementById("playerTwoWins");

let gameBoard;

//Create new gameboard for another game
function createGameBoard() {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

//reset gameboard for new game
function resetGame() {
  gameBoard = createGameBoard();
  isGameOver = false;
  gameResult.textContent = "";
  currentPlayer = markSelect.value;
  markSelect.disabled = true;
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
}

playerOne = {
  name: "",
  wins: 0,
};
playerTwo = {
  name: "",
  wins: 0,
};

function getPlayerWinsText(player) {
  return `${player.name} win count: ${player.wins}`;
}

//Update win counts
function updatePlayerWins() {
  playerOneWins.textContent = getPlayerWinsText(playerOne);
  playerTwoWins.textContent = getPlayerWinsText(playerTwo);
}

//Check if names are given
function nameCheck() {
  alert("Don't you guys have names?");
}

let currentPlayer;

markSelect.addEventListener("change", (e) => {
  currentPlayer = markSelect.value;
});

//Start or reset game
startGameButton.addEventListener("click", () => {
  playerOne.name = playerOneInput.value;
  playerTwo.name = playerTwoInput.value;
  if (playerOne.name !== "" && playerTwo.name !== "") {
    markSelect.disabled = true;
    resetGame();
    cells.forEach((cell) => {
      cell.removeEventListener("click", makeMoveEventListener);
      cell.addEventListener("click", makeMoveEventListener);
    });
  } else nameCheck();
});

function makeMoveEventListener() {
  if (!isGameOver) {
    makeMove(this);
  }
}

//Make a mark in chosen cell
function makeMove(cell) {
  if (cell.innerHTML === "") {
    let row = cell.getAttribute("data-row");
    let column = cell.getAttribute("data-col");
    cell.innerHTML = currentPlayer;
    gameBoard[row][column] = currentPlayer;
    checkWinner(currentPlayer);

    // Switch to the other player for the next turn
    if (!isGameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    let isDraw = true; //control if it is a draw
    cells.forEach((cell) => {
      if (cell.innerHTML === "") {
        isDraw = false;
      }
    });

    // Alert if the game ends as a draw
    if (isDraw && !isGameOver) {
      gameResult.textContent = "It is a draw";
      markSelect.disabled = false;
    }
  } else alert("This spot is already marked!");
}

//check for winner for 3 marks in row
function checkWinner(player) {
  for (let row = 0; row < 3; row++) {
    if (
      gameBoard[row][0] === player &&
      gameBoard[row][1] === player &&
      gameBoard[row][2] === player
    )
      gameOver(player);
  }

  for (let column = 0; column < 3; column++) {
    if (
      gameBoard[0][column] === player &&
      gameBoard[1][column] === player &&
      gameBoard[2][column] === player
    )
      gameOver(player);
  }

  if (
    (gameBoard[0][0] === player &&
      gameBoard[1][1] === player &&
      gameBoard[2][2] === player) ||
    (gameBoard[0][2] === player &&
      gameBoard[1][1] === player &&
      gameBoard[2][0] === player)
  )
    gameOver(player);
}

//Says when it is game over and show results
function gameOver(winner) {
  if (winner == markSelect.value) {
    gameResult.textContent = playerOne.name + " won!";
    playerOne.wins++;
    updatePlayerWins();
  } else if (winner !== markSelect.value) {
    gameResult.textContent = playerTwo.name + " won!";
    playerTwo.wins++;
    updatePlayerWins();
  }
  isGameOver = true;
  currentPlayer = markSelect.value;
  markSelect.disabled = false;
}
