// start when loading the page
document.addEventListener('DOMContentLoaded', () => {
    const emojis = ['😀', '😂', '😊', '😍', '🤔', '😎', '😭', '😡'];
    let gameBoard = document.getElementById('game-board');
    let resetButton = document.getElementById('reset-button');
    let successMessage = document.getElementById('success-message');
    let cardArray, firstCard, secondCard, lockBoard, matchedPairs;

    // function that made game board 
    function initGame() {
        gameBoard.innerHTML = '';
        successMessage.style.display = 'none';
        cardArray = [...emojis, ...emojis];
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchedPairs = 0;

        // Shuffle the cards
        cardArray.sort(() => 0.5 - Math.random());

        // Create the cards
        cardArray.forEach(emoji => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.dataset.emoji = emoji;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.emoji;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    // check a match between cards
    function checkForMatch() {
        let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
        isMatch ? handleMatch() : unflipCards();
    }

    function handleMatch() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matchedPairs++;
        resetBoard();
        if (matchedPairs === emojis.length) {
            successMessage.style.display = 'block';
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }

    // reset button that reset the game
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    resetButton.addEventListener('click', initGame);

    initGame();
});
