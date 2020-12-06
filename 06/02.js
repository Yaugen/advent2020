const fs = require("fs");
const os = require("os");

const parseInput = () => {
  const lines = fs.readFileSync("./input", "utf8").split(os.EOL);

  const input = [];
  let currentLine = [];

  for (const line of lines) {
    if (line) {
      currentLine.push(line);
    } else {
      input.push(currentLine);
      currentLine = [];
    }
  }
  input.push(currentLine);

  return input;
};

const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)));

const run = () => {
  const input = parseInput();
  console.log(input);

  const total = input
    .map((arr) => {
      const intersectionSet = arr
        .slice(1)
        .reduce(
          (prev, curr) => intersection(prev, new Set(curr)),
          new Set(arr[0])
        );
      return intersectionSet.size;
    })
    .reduce((acc, item) => acc + item, 0);

  console.log(total);
};

run();
