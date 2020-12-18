const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs.readFileSync(__dirname + "/" + inputFileName, "utf8").split(os.EOL);
};

const process = (input) => {
  const startTimespan = Number(input[0]);
  const busIds = input[1]
    .split(",")
    .filter((c) => c !== "x")
    .map(Number);

  let curTimespan = startTimespan;
  while (true) {
    const busId = busIds.find((id) => curTimespan % id === 0);
    if (busId) {
      return (curTimespan - startTimespan) * busId;
    }
    curTimespan += 1;
  }
  return;
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
