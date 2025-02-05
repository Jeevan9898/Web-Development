// Game variables
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = Array(9).fill(null); // 9 empty cells
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

// Create the game board
function createBoard() {
  board.innerHTML = ''; // Clear board
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index; // Store the cell's index
    cellElement.addEventListener('click', handleCellClick);
    board.appendChild(cellElement);
  });
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  // If the cell is already taken or the game is over, do nothing
  if (gameState[index] || !isGameActive) return;

  // Mark the cell with the current player's symbol
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for a winner or draw
  if (checkWinner()) {
    message.textContent = `🎉 Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (gameState.every(cell => cell)) {
    message.textContent = `It's a draw! 🤝`;
    isGameActive = false;
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

// Restart the game
restartBtn.addEventListener('click', () => {
  gameState = Array(9).fill(null);
  currentPlayer = 'X';
  isGameActive = true;
  message.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

// Initialize the game
createBoard();
message.textContent = `Player ${currentPlayer}'s turn`;
