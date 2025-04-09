const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-game');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');

let currentPlayer = 'x';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { x: 0, o: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.classList.remove('x', 'o', 'win');
    });
    
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'x';
    updateGameStatus(`Player X's turn`);
    
    resetButton.addEventListener('click', resetGame);
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);
    
    if (gameState[index] !== '' || !gameActive) {
        return;
    }
    
    // Update the game state
    gameState[index] = currentPlayer;
    cell.classList.add(currentPlayer);
    
    // Check for win or draw
    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        updateGameStatus(`Player ${currentPlayer.toUpperCase()}'s turn`);
    }
}

// Check for a win
function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            // Highlight winning cells
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            
            return true;
        }
    }
    
    return false;
}

// Check for a draw
function checkDraw() {
    return gameState.every(cell => cell !== '');
}

// End the game
function endGame(isDraw) {
    gameActive = false;
    
    if (isDraw) {
        updateGameStatus(`Game ended in a draw!`);
    } else {
        // Update score
        scores[currentPlayer]++;
        scoreX.textContent = scores.x;
        scoreO.textContent = scores.o;
        
        updateGameStatus(`Player ${currentPlayer.toUpperCase()} wins!`);
    }
}

// Update game status message
function updateGameStatus(message) {
    gameStatus.textContent = message;
}

// Reset the game
function resetGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'win');
    });
    
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'x';
    updateGameStatus(`Player X's turn`);
}

// Initialize the game on page load
initGame();
