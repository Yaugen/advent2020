const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split(os.EOL + os.EOL)
    .map((inputPart) => {
      const [deckInfo, ...cards] = inputPart.split(os.EOL);
      return cards.map(Number);
    });
};

const getScore = (deck) =>
  deck.reverse().reduce((acc, item, index) => acc + item * (index + 1), 0);

const process = (decks) => {
  const [player1Deck, player2Deck] = decks;
  while (player1Deck.length && player2Deck.length) {
    const player1Card = player1Deck.shift();
    const player2Card = player2Deck.shift();
    if (player1Card > player2Card) {
      player1Deck.push(player1Card, player2Card);
    } else {
      player2Deck.push(player2Card, player1Card);
    }
  }
  const winDeck = player1Deck.length ? player1Deck : player2Deck;

  return getScore(winDeck);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
