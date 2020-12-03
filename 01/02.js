const fs = require("fs");
const os = require("os");

const findSumTuple = (numbers, target) => {
  const hash = {};
  for (let n of numbers) {
    const counter = target - n;
    if (hash[counter]) {
      return [n, counter];
    }
    hash[n] = true;
  }
  return null;
};

const findSumTriple = (numbers, target) => {
  for (let i = 0; i < numbers.length; i++) {
    const excluding = numbers.filter((_, index) => index !== i);
    const pair = findSumTuple(excluding, target - numbers[i]);

    if (pair) {
      return [...pair, numbers[i]];
    }
  }
};

const run = () => {
  const numbers = fs
    .readFileSync("./input", "utf8")
    .split(os.EOL)
    .map(Number);

  const [a, b, c] = findSumTriple(numbers, 2020);

  console.log(a * b * c);
};

run();
