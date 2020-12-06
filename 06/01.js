const fs = require("fs");
const os = require("os");

const parseInput = () => {
  const lines = fs.readFileSync("./input", "utf8").split(os.EOL);

  const input = [];
  let currentLine = "";

  for (const line of lines) {
    if (line) {
      currentLine += line;
    } else {
      input.push(currentLine);
      currentLine = "";
    }
  }
  input.push(currentLine);

  return input;
};

const run = () => {
  const input = parseInput();

  const total = input.reduce((acc, line) => {
    const set = new Set(line.split(""));
    return acc + set.size;
  }, 0);

  console.log(total);
};

run();
