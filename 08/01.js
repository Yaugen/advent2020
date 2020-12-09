const fs = require("fs");
const os = require("os");

const parseInput = () => {
  return fs.readFileSync("./input", "utf8").split(os.EOL);
};

const run = () => {
  const program = parseInput();

  let currLine = 0;
  let accumulator = 0;
  const executedLines = new Set();

  while (true) {
    if (executedLines.has(currLine)) {
      console.log(accumulator);
      return;
    }

    const [op, argStr] = program[currLine].split(" ");
    const arg = Number(argStr);
    executedLines.add(currLine);

    if (op === "acc") {
      accumulator += arg;
      currLine += 1;
    } else if (op === "jmp") {
      currLine += arg;
    } else if (op === "nop") {
      currLine += 1;
    }
  }
};

run();
