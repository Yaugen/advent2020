const fs = require("fs");
const os = require("os");

const parseInput = () => {
  return fs
    .readFileSync("./input", "utf8")
    .split(os.EOL)
    .map((l) => {
      const fb = l.slice(0, 7);
      const lr = l.slice(-3);
      return [fb, lr];
    });
};

const middle = (min, max) => min + Math.floor((max - min) / 2);

const run = () => {
  const input = parseInput();
  const values = input.map(([fb, lr]) => {
    const row = parseInt(fb.replace(/F/g, "0").replace(/B/g, "1"), 2);
    const column = parseInt(lr.replace(/L/g, "0").replace(/R/g, "1"), 2);
    return row * 8 + column;
  });

  const ids = [];
  for (let r = 0; r < 128; r++) {
    for (let c = 0; c < 8; c++) {
      const id = r * 8 + c;
      if (!values.includes(id)) {
        ids.push(id);
      }
    }
  }
  console.log(ids.join("\n"));
};

run();
