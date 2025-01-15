// script.js
const board = document.getElementById("board");
const restartBtn = document.getElementById("restart");
const resetScoreBtn = document.getElementById("reset-score");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const symbolSelector = document.getElementById("symbol");

let currentSymbol = "X";
let boardState = Array(9).fill(null);
let scores = { X: 0, O: 0 };

// Initialize the board
function createBoard() {
  board.innerHTML = "";
  boardState.fill(null);
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("w-20", "h-20", "border", "border-gray-700", "bg-gray-800", "text-white", "flex", "items-center", "justify-center", "text-2xl", "font-bold", "cursor-pointer");
    cell.dataset.index = i;
    cell.addEventListener("click", onCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function onCellClick(event) {
  const index = event.target.dataset.index;
  if (!boardState[index]) {
    boardState[index] = currentSymbol;
    event.target.textContent = currentSymbol;
    event.target.classList.remove("cursor-pointer");
    checkWinner();
    currentSymbol = currentSymbol === "X" ? "O" : "X";
  }
}

// Check if there's a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      displayWinner(boardState[a]);
      scores[boardState[a]]++;
      updateScore();
      createBoard();
      return;
    }
  }

  if (!boardState.includes(null)) {
    displayWinner("Draw");
    createBoard();
  }
}

// Display winner
function displayWinner(winner) {
  const message = winner === "Draw" ? "It's a draw!" : `${winner} wins!`;
  const winnerDiv = document.createElement("div");
  winnerDiv.textContent = message;
  winnerDiv.classList.add("text-xl", "font-bold", "text-center", "mt-4", "text-yellow-400");
  document.body.appendChild(winnerDiv);
  setTimeout(() => {
    winnerDiv.remove();
  }, 3000);
}

// Update score
function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

// Reset the game board
restartBtn.addEventListener("click", () => {
  createBoard();
});

// Reset scores
resetScoreBtn.addEventListener("click", () => {
  scores = { X: 0, O: 0 };
  updateScore();
});

// Update symbol choice
symbolSelector.addEventListener("change", (event) => {
  currentSymbol = event.target.value;
});

// Initialize the game
createBoard();
