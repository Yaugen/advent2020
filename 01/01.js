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
};

const run = () => {
  const numbers = fs
    .readFileSync("./input", "utf8")
    .split(os.EOL)
    .map(Number);

  const [a, b] = findSumTuple(numbers, 2020);

  console.log(a * b);
};

run();
