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
