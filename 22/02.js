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

const getRoundHash = (deck1, deck2) => `${deck1.join(",")}-${deck2.join(",")}`;

const RESULT = {
  P1: "P1",
  P2: "P2",
};

const playGame = (deck1, deck2, game = 1) => {
  const previousRounds = [];
  let round = 0;
  while (deck1.length && deck2.length) {
    round += 1;
    const roundHash = getRoundHash(deck1, deck2);
    if (previousRounds.includes(roundHash)) {
      return { result: RESULT.P1, winDeck: deck1 };
    } else {
      previousRounds.push(roundHash);
    }

    const card1 = deck1.shift();
    const card2 = deck2.shift();
    let roundResult;
    if (card1 <= deck1.length && card2 <= deck2.length) {
      const { result: subGameResult } = playGame(
        deck1.slice(0, card1),
        deck2.slice(0, card2),
        game + 1
      );
      roundResult = subGameResult;
    } else {
      roundResult = card1 > card2 ? RESULT.P1 : RESULT.P2;
    }

    if (roundResult === RESULT.P1) {
      deck1.push(card1, card2);
    } else {
      deck2.push(card2, card1);
    }
  }

  return deck1.length
    ? { result: RESULT.P1, winDeck: deck1 }
    : { result: RESULT.P2, winDeck: deck2 };
};

const getScore = (deck) =>
  deck.reverse().reduce((acc, item, index) => acc + item * (index + 1), 0);

const process = (decks) => {
  const [deck1, deck2] = decks;
  const { winDeck } = playGame(deck1, deck2);

  return getScore(winDeck);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

run("testInput02");

module.exports = { run };
