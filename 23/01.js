const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split("")
    .map(Number);
};

const getDestinationCup = (cups, currentCup) => {
  let destinationCup = currentCup - 1;
  while (destinationCup >= 1) {
    if (cups.includes(destinationCup)) {
      return destinationCup;
    }
    destinationCup -= 1;
  }
  return Math.max(...cups);
};

const performShuffle = (input, iterations) => {
  let cups = input.slice();
  let currentCup = input[0];

  for (let i = 0; i < iterations; i += 1) {
    const startIndex = cups.indexOf(currentCup) + 1;
    const endIndex = startIndex + 3;
    const pickUp = [
      ...cups.slice(startIndex, endIndex),
      ...(endIndex > cups.length ? cups.slice(0, endIndex - cups.length) : []),
    ];
    const rest = cups.filter((cup) => !pickUp.includes(cup));
    const destinationCup = getDestinationCup(rest, currentCup);
    const destinationIndex = rest.indexOf(destinationCup);
    // console.log(
    //   `${cups.join(" ")} - ${pickUp.join(
    //     " "
    //   )} - ${destinationCup} - ${currentCup}`
    // );
    rest.splice(destinationIndex + 1, 0, ...pickUp);
    cups = rest;

    const nextCupIndex = (cups.indexOf(currentCup) + 1) % cups.length;
    currentCup = cups[nextCupIndex];
  }

  return Number(
    [...cups, ...cups]
      .slice(cups.indexOf(1) + 1, cups.indexOf(1) + cups.length)
      .join("")
  );
};

const run = (inputFileName, iterations) => {
  const input = parseInput(inputFileName);
  return performShuffle(input, iterations);
};

module.exports = { run };
