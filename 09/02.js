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

const findContiniousRange = (numbers, targetSum) => {
  for (let i = 0; i < numbers.length; i++) {
    let acc = 0;
    for (let j = i; j < numbers.length; j++) {
      acc += numbers[j];
      if (acc === targetSum && i !== j) {
        return [i, j];
      } else if (acc > targetSum) {
        break;
      }
    }
  }
};

const run = () => {
  const PREAMBLE_SIZE = 25;
  const numbers = parseInput();
  const invalidNumber = findInvalidNumber(numbers, PREAMBLE_SIZE);

  const [from, to] = findContiniousRange(numbers, invalidNumber);
  const range = numbers.slice(from, to + 1);
  const max = Math.max(...range);
  const min = Math.min(...range);
  console.log(
    `invalid number ${invalidNumber} range ${from}-${to}: ${max + min}`
  );
};

run();
