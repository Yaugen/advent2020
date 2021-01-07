const fs = require("fs");
const os = require("os");
const { CircularList } = require("./utils");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split("")
    .map(Number);
};

const getDestinationCupValue = (currentCupValue, pickUp, min, max) => {
  let destinationCupValue = currentCupValue - 1;
  while (destinationCupValue >= min && pickUp.includes(destinationCupValue)) {
    destinationCupValue -= 1;
  }
  if (destinationCupValue > 0) {
    return destinationCupValue;
  }
  destinationCupValue = max;
  while (pickUp.includes(destinationCupValue)) {
    destinationCupValue -= 1;
  }
  return destinationCupValue;
};

const performShuffle = (input, iterations, valueCount = input.length) => {
  const cups = new CircularList();
  const lookup = {};
  for (let i = 0; i < valueCount; i += 1) {
    if (i < input.length) {
      lookup[input[i]] = cups.append(input[i]);
    } else {
      lookup[i + 1] = cups.append(i + 1);
    }
  }
  const MIN = 1;
  const MAX = valueCount;
  let currentCup = cups.head;

  for (let i = 0; i < iterations; i++) {
    const pickUp = [
      cups.removeRight(currentCup),
      cups.removeRight(currentCup),
      cups.removeRight(currentCup),
    ];
    delete lookup[pickUp[0]];
    delete lookup[pickUp[1]];
    delete lookup[pickUp[2]];

    const destinationCupValue = getDestinationCupValue(
      currentCup.value,
      pickUp,
      MIN,
      MAX
    );
    const destinationCup = lookup[destinationCupValue];
    pickUp.reverse().forEach((v) => {
      lookup[v] = cups.appendRight(destinationCup, v);
    });

    currentCup = currentCup.right;
  }
  return lookup;
};

const run = (inputFileName, iterations, valueCount) => {
  const input = parseInput(inputFileName);
  const lookup = performShuffle(input, iterations, valueCount);
  const cup = lookup[1];
  return cup.right.value * cup.right.right.value;
};

module.exports = { run };
