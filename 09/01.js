const fs = require("fs");
const os = require("os");

const parseInput = () => {
  return fs.readFileSync("./input", "utf8").split(os.EOL).map(Number);
};

const isValid = (number, preamble) => {
  for (let i = 0; i < preamble.length; i++) {
    for (let j = i + 1; j < preamble.length; j++) {
      if (preamble[i] + preamble[j] === number) {
        return true;
      }
    }
  }
  return false;
};

const findInvalidNumber = (numbers, PREAMBLE_SIZE) => {
  for (let i = PREAMBLE_SIZE; i < numbers.length; i++) {
    const preamble = numbers.slice(i - PREAMBLE_SIZE, i);
    if (!isValid(numbers[i], preamble)) {
      return numbers[i];
    }
  }
};

const run = () => {
  const PREAMBLE_SIZE = 25;
  const numbers = parseInput();
  const invalidNumber = findInvalidNumber(numbers, PREAMBLE_SIZE);

  console.log(invalidNumber);
};

run();
