const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split(os.EOL)
    .map(Number);
};

const getNext = (value, subjectNumber) => (value * subjectNumber) % 20201227;
const transform = (subjectNumber, loopSize) => {
  let value = 1;
  for (let i = 0; i < loopSize; i += 1) {
    value = getNext(value, subjectNumber);
  }
  return value;
};

const guessLoopSize = (cardPublicKey, doorPublicKey) => {
  let value = 1;
  let loopSize = 1;
  let cardLoopSize;
  let doorLoopSize;

  while (!cardLoopSize || !doorLoopSize) {
    value = getNext(value, 7);
    if (!cardLoopSize && cardPublicKey === value) {
      cardLoopSize = loopSize;
    }
    if (!doorLoopSize && doorPublicKey === value) {
      doorLoopSize = loopSize;
    }

    loopSize += 1;
  }
  return [cardLoopSize, doorLoopSize];
};

const process = (input) => {
  const [cardPublicKey, doorPublicKey] = input;
  const [cardLoopSize, doorLoopSize] = guessLoopSize(
    cardPublicKey,
    doorPublicKey
  );

  const cardEncryptionKey = transform(doorPublicKey, cardLoopSize);
  const doorEncryptionKey = transform(cardPublicKey, doorLoopSize);
  console.log(`card: ${cardEncryptionKey}    door: ${doorEncryptionKey}`);

  return cardEncryptionKey;
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
