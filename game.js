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
 * A lookup object used to determine what combination of valid plays 
 *     results in a win.Undefined equals a tie
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


/** Indicates whether a long running game is finished or not */
let continueGame;
/** Keeps track of how many valid games have been played */
let validGames;
/** Keeps track of player score */
let score;


/**
 * Initializes a new game of Rock, Paper, Scissors
 */
function newGame() {
    continueGame = true;
    validGames = 0;
    score = 0;
}


/**
 * Returns a random integer
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * 
 * @param { Number } max The maximum number
 * @returns A number from [0-max)
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


/**
 * Generates a play for the computer.
 * 
 * @returns A string containing either 'rock', 'paper', or 
 *     'scissors' to indicate the computers play
 */
function getComputerChoice () {
    const choice = getRandomInt(VALID_PLAYS.length);

    return VALID_PLAYS[choice];
}


/**
 * Plays a round of the game
 * 
 * @param { 'rock' | 'paper' | 'scissors' } playerSelection The shape 
 *     thrown by the player
 * @param { 'rock' | 'paper' | 'scissors' } computerSelection The shape 
 *     thrown by the computer
 * @returns false if the round was a tie, 1 if the player wins, 0 if 
 *     the player loses
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
 * Takes a game result and processes it into a user friendly string 
 *     that can be presented to the user
 * 
 * @param { false | 1 | 0 } result The result of a game to be processed
 * @param { 'rock' | 'paper' | 'scissors' } playerChoice The play that 
 *     the player has chosen
 * @param { 'rock' | 'paper' | 'scissors' } computerChoice The play 
 *     that the computer has chosen
 * @returns A string that can be shown to the user to indicate the game
 *     result
 */
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


/**
 * Gets the current score and whether the player is winning or not
 * 
 * @returns An object containing the current game state
 */
function getScore() {
    return {
        message: `Score: ${score}/${validGames}`,
        isPlayerWinning: score > validGames / 2
    }
}


/**
 * Takes a query string to select an element, removes the first child
 *     text element, creates a new text element and appends it to the 
 *     parent element.
 * 
 * @param {String} query A query string to select a parent element
 * @returns A text element appended as a child to the parent
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


/**
 * Takes a users selection and plays a round of Rock, Paper, Scissors
 * 
 * @param { 'Rock' | 'Paper' | 'Scissors' } buttonName The name of the 
 *     button selected by the user. Taken to be the users 'play'
 */
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


const playButtonList = document.querySelectorAll('button.play');
const playButtonArray = Array.from(playButtonList);


playButtonArray.forEach((button) => {
    button.addEventListener('click', () => playButtonClicked(button.innerText));
});


/**
 * Plays a console based game of rock, paper, scissors
 * 
 * @param {?Number} bestOf sets the number of games to be played
 *     Defaults to 5, assumes number is odd
 * 
 * @returns true if the player has won, false if they have lost
 * @error throws if bestOf not odd number
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