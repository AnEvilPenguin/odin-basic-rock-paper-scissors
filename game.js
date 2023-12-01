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


const choiceMap = new Map([
    [0, 'Rock'],
    [1, 'Paper'],
    [2, 'Scissors']
]);


/**
 * Generates a play for the computer.
 * 
 * @returns A string containing either 'Rock', 'Paper', or 'Scissors' to indicate the computers play.
 */
function getComputerChoice () {
    const choice = getRandomInt(3);

    return choiceMap.get(choice);
}

