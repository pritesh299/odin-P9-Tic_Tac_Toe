// Select all game boxes
const gameBoxs = document.querySelectorAll(".game_box");

// Initialize game board and winning combinations
let gameBoard = ["", "", "", "", "", "", "", "", ""];
const winCombos = [
  [0, 1, 2],
  [0, 3, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [0, 4, 8]
];

// Initialize game variables
let currentPlayer = 'x';
let win = false;
let reset = false;
let turn = 0;
let isComputerPlayer = false;

// Get DOM elements
const gamePage = document.getElementById('game_page');
const startPage = document.getElementById('start_page');
const selectiontPage = document.getElementById('selection_page');
const startBtn = document.getElementById('start_button');
const gameText = document.getElementById('game_headline');
const resetBtn = document.getElementById('reset_button');
const playerSelectBtn = document.getElementById('player_select_button');
const compSelectBtn = document.getElementById('computer_select_button');
const selectOpponentBtn = document.getElementById('select_opponent_button');

// Event listeners
startBtn.addEventListener('click', () => {
  startPage.style.display = 'none';
  selectiontPage.style.display = 'block';
});

playerSelectBtn.addEventListener('click', () => {
  isComputerPlayer = false;
  selectiontPage.style.display = 'none';
  gamePage.style.display = "block";
});

compSelectBtn.addEventListener('click', () => {
  isComputerPlayer = true;
  selectiontPage.style.display = 'none';
  gamePage.style.display = "block";
});

resetBtn.addEventListener('click', resetGame);

selectOpponentBtn.addEventListener('click', () => {
  resetGame();
  selectiontPage.style.display = 'block';
  gamePage.style.display = "none";
});

// Event listeners for game boxes
gameBoxs.forEach(box => {
  box.addEventListener('click', () => {
    if (box.innerText === "" && !win) {
      turn++;
      if (!isComputerPlayer || (isComputerPlayer && currentPlayer === 'x')) {
        // Update the game board
        box.innerText = currentPlayer;
        let index = Number(box.getAttribute('id'));
        gameBoard[index - 1] = currentPlayer;
        
        // Check for a win
        checkWin();
        if(win){gameText.innerText= 'player '+ currentPlayer.toLocaleUpperCase()+" Won"}

        // Switch players
        if (currentPlayer === 'x') {
          currentPlayer = 'o';
        } else {
          currentPlayer = 'x';
        }

        // If it's computer's turn and game is not won, make a computer move
        if (isComputerPlayer && currentPlayer === 'o' && !win) {
          setTimeout(makeComputerMove, 400);
        }

        // Display game status
        if (turn === 9 && !win) {
          gameText.innerText = "It's a Tie";
        } else if (!win) {
          gameText.innerText = `Player ${currentPlayer.toUpperCase()}`;
        }
      }
    }
  });
});

// Function to make a computer move
function makeComputerMove() {
  if (turn === 9 && !win) {
    gameText.innerText = "It's a Tie";
  } else if (!win && turn <9) {
    let emptyIndexes = [];

    // Find empty indexes on the game board
    for (let i = 0; i < gameBoard.length; i++) {
      if (gameBoard[i] === '') {
        emptyIndexes.push(i);
      }
    }

    // Choose a random empty index
    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    let compBox = document.getElementById(`${randomIndex + 1}`);

    // Update the game board
    compBox.innerText = currentPlayer;
    gameBoard[randomIndex] = currentPlayer;

    // Check for a win
    checkWin();
    if(win){gameText.innerText= 'player '+ currentPlayer.toLocaleUpperCase()+" Won"}

    // Switch players
    if (currentPlayer === 'x') {
      currentPlayer = 'o';
    } else {
      currentPlayer = 'x';
    }

    // Display game status
    if(!win){gameText.innerText = `Player ${currentPlayer.toUpperCase()}`;}
    turn++;
  }
}

// Function to check for a win
function checkWin() {
  for (let combo of winCombos) {
    let [a, b, c] = combo;
    if (!(gameBoard[a] === "") && !(gameBoard[b] === "") && !(gameBoard[c] === "")) {
      if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] === gameBoard[c]) {
        win = true;

        // Highlight winning boxes
        const box1 = document.getElementById(`${a + 1}`);
        const box2 = document.getElementById(`${b + 1}`);
        const box3 = document.getElementById(`${c + 1}`);
        box1.style.backgroundColor = 'green';
        box2.style.backgroundColor = 'green';
        box3.style.backgroundColor = 'green';
      }
    }
  }
}

// Function to reset the game
function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameText.innerText = 'Player X';
  currentPlayer = 'x';
  win = false;
  turn = 0;

  // Reset game boxes
  gameBoxs.forEach(box => {
    box.innerText = "";
    box.style.backgroundColor = '#E3F4F4';
  });
}
