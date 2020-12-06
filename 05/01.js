const fs = require("fs");
const os = require("os");

const parseInput = () => {
  return fs
    .readFileSync("./input", "utf8")
    .split(os.EOL)
    .map((l) => {
      const fb = l.slice(0, 7).split("");
      const lr = l.slice(-3).split("");
      return [fb, lr];
    });
};

const middle = (min, max) => min + Math.floor((max - min) / 2);

const getFB = (items, min = 0, max = 127) => {
  const item = items.shift();
  if (items.length) {
    return item === "F"
      ? getFB(items, min, middle(min, max))
      : getFB(items, middle(min, max), max);
  }
  return item === "F" ? min : max;
};

const getLR = (items, min = 0, max = 7) => {
  const item = items.shift();
  if (items.length) {
    return item === "L"
      ? getLR(items, min, middle(min, max))
      : getLR(items, middle(min, max), max);
  }
  return item === "L" ? min : max;
};

const run = () => {
  const input = parseInput();
  const values = input.map(([fb, lr]) => {
    return getFB(fb) * 8 + getLR(lr);
  });

  console.log(Math.max(...values));
};

run();
