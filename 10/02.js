const fs = require("fs");
const os = require("os");

const parseInput = () =>
  fs
    .readFileSync(__dirname + "/input", "utf8")
    .split(os.EOL)
    .map(Number);

const getDiffs = (numbers) => {
  const diffs = [0, 0, 0];
  for (let i = 0; i < numbers.length - 1; i++) {
    const diff = numbers[i + 1] - numbers[i];
    diffs[diff - 1] += 1;
  }

  return diffs;
};

const getArrangemetsAmount = (numbers) => {
  const arrangements = { 0: 1 };
  for (let i = 0; i < numbers.length; i++) {
    let j = i + 1;

    while (numbers[j] <= numbers[i] + 3) {
      arrangements[numbers[j]] =
        (arrangements[numbers[i]] || 0) + (arrangements[numbers[j]] || 0);
      j++;
    }
  }
  console.log(arrangements);
  return Object.values(arrangements).pop();
};

const run = () => {
  let numbers = parseInput();
  numbers.sort((a, b) => a - b);
  numbers = [0, ...numbers, numbers[numbers.length - 1] + 3];

  console.log(getArrangemetsAmount(numbers));
};

run();
