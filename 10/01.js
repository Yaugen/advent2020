const fs = require("fs");
const os = require("os");

const parseInput = () =>
  fs.readFileSync("./input", "utf8").split(os.EOL).map(Number);

const getDiffs = (numbers) => {
  const diffs = [0, 0, 0];
  for (let i = 0; i < numbers.length - 1; i++) {
    const diff = numbers[i + 1] - numbers[i];
    diffs[diff - 1] += 1;
  }

  return diffs;
};

const run = () => {
  let numbers = parseInput();
  numbers.sort((a, b) => a - b);
  numbers = [0, ...numbers, numbers[numbers.length - 1] + 3];

  const [oneDiffs, , threeDiffs] = getDiffs(numbers);
  console.log(numbers, oneDiffs * threeDiffs);
};

run();
