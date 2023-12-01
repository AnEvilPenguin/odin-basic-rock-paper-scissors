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
const validPlays = [
    'rock',
    'paper',
    'scissors'
];


/**
 * Generates a play for the computer.
 * 
 * @returns A string containing either 'rock', 'paper', or 'scissors' to indicate the computers play.
 */
function getComputerChoice () {
    const choice = getRandomInt(validPlays.length);

    return validPlays[choice];
}

