const fs = require("fs");
const os = require("os");

const readInput = () => {
  return fs
    .readFileSync("./input", "utf8")
    .split(os.EOL)
    .map((l) => l.split(""));
};

const run = () => {
  const field = readInput();
  const width = field[0].length;
  const height = field.length;
  const diffs = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const results = [];

  for (let [dx, dy] of diffs) {
    let x = 0;
    let y = 0;
    let tree = 0;
    let empty = 0;
    while (y < height) {
      if (field[y][x] === ".") {
        empty += 1;
      } else {
        tree += 1;
      }

      x += dx;
      y += dy;
      if (x >= width) {
        x -= width;
      }
    }
    results.push({ tree, empty });
  }
  console.log(
    results.map(({ tree }) => tree).reduce((acc, item) => acc * item, 1)
  );
};

run();
