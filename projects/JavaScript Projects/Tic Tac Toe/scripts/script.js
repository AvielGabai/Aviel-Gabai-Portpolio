// start when loading the page
document.addEventListener('DOMContentLoaded', () => {
    // variables
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const statusDisplay = document.getElementById('status');
    let board, currentPlayer, gameActive;

    // function that made game board and text of the starting player
    function initGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        gameBoard.innerHTML = '';

        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cellElement);
        });
    }

    // function that check if cell is empty, if so put a mark of the player in the cell
    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.index);

        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    // function that check if someone win
    function checkResult() {
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

        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] === '' || board[b] === '' || board[c] === '') {
                continue;
            }
            if (board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            statusDisplay.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    // button that reset the page and the game
    resetButton.addEventListener('click', initGame);

    initGame();
});
