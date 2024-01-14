/**
 * Returns a random integer.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * 
 * @param { Number } max The maximum number
 * @returns A number from [0-max)
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


/**
 * A list of valid plays to chose from in our game
 */
const VALID_PLAYS = [
    'rock',
    'paper',
    'scissors'
];


/**
 * A lookup object used to convert valid plays to display values
 */
const DISPLAY_LOOKUP = {
    'rock': 'Rock',
    'paper': 'Paper',
    'scissors': 'Scissors'
}


/**
 * A lookup object used to determine what combination of valid plays results in a win
 * Undefined equals a tie
 */
const WIN_LOOKUP = {
    rock:{
        paper: false,
        scissors: true
    },
    paper: {
        scissors: false,
        rock: true
    },
    scissors: {
        rock: false,
        paper: true
    }
};


/**
 * Generates a play for the computer.
 * 
 * @returns A string containing either 'rock', 'paper', or 'scissors' to indicate the computers play.
 */
function getComputerChoice () {
    const choice = getRandomInt(VALID_PLAYS.length);

    return VALID_PLAYS[choice];
}


/**
 * Plays a round of the game.
 * 
 * @param { 'rock' | 'paper' | 'scissors' } playerSelection The shape thrown by the player
 * @param { 'rock' | 'paper' | 'scissors' } computerSelection The shape thrown by the computer
 * @returns false if the round was a tie, 1 if the player wins, 0 if the player loses.
 */
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase().trim();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        // TIE, round must be replaced
        return false;
    }

    return +WIN_LOOKUP[ playerSelection ][ computerSelection ];
}


/**
 * Plays a game of rock, paper, scissors.
 * 
 * @param {?Number} bestOf sets the number of games to be played. 
 *     Defaults to 5, assumes number is odd.
 * 
 * @returns true if the player has won, false if they have lost.
 * @error throws if bestOf not odd number.
 */
function game(bestOf = 5) {
    if (typeof bestOf !== 'number' || bestOf % 2 === 0) {
        throw new Error('bestOf required to be odd number');
    }

    newGame();

    do {
        const computerSelection = getComputerChoice();
        const playerSelection = prompt('Select your play (rock, paper, or scissors)').toLowerCase().trim();

        if (!VALID_PLAYS.includes(playerSelection)) {
            console.log('Invalid selection. Expected one of: "rock", "paper", or "scissors".');
            continue;
        }

        const result = playRound(playerSelection, computerSelection);

        console.log(processGameResult(result, playerSelection, computerSelection));

        if (validGames === bestOf) {
            continueGame = false;
        }

    } while(continueGame);

    const { message, isPlayerWinning } = getScore();
    
    console.log(message);
    return isPlayerWinning;
}


let continueGame;
let validGames;
let score;


function newGame() {
    continueGame = true;
    validGames = 0;
    score = 0;
}


function getScore() {
    return {
        message: `Score: ${score}/${validGames}`,
        isPlayerWinning: score > validGames / 2
    }
}


function playButtonClicked(buttonName) {
    if (continueGame == null) {
        newGame();
    }

    const computerSelection = getComputerChoice();
    const playerSelection = buttonName.toLowerCase();

    const resultText = getTextFromElement('div.results');

    const result = playRound(playerSelection, computerSelection);

    resultText.innerText = processGameResult(result, playerSelection, computerSelection);

    const scoreText = getTextFromElement('div.score');

    const { message } = getScore();
    scoreText.innerText = message;
}


/**
 * Takes a query string to select an element, removes the first child
 *     text element, creates a new text element and appends it to the 
 *     parent element.
 * 
 * @param {String} query 
 * @returns 
 */
function getTextFromElement(query) {
    const div = document.querySelector(query);
    const existingText = div.querySelector('p');

    if (existingText) {
        div.removeChild(existingText);
    }

    const newText = document.createElement('p');

    div.appendChild(newText);

    return newText;
}

const playButtonList = document.querySelectorAll('button.play');
const playButtonArray = Array.from(playButtonList);

playButtonArray.forEach((button) => {
    button.addEventListener('click', () => playButtonClicked(button.innerText));
});


function processGameResult(result, playerChoice, computerChoice) {
    switch (result) {
        case false: {
            return 'TIE game!';
        }
        case 1: {
            score++;
            validGames++;
            return `You Win! ${DISPLAY_LOOKUP[playerChoice]} beats ${DISPLAY_LOOKUP[computerChoice]}`;
        }
        case 0: {
            validGames++;
            return `You Lose! ${DISPLAY_LOOKUP[computerChoice]} beats ${DISPLAY_LOOKUP[playerChoice]}`;
        }
    }
}
