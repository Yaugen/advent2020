const fs = require("fs");
const os = require("os");

const parseInput = () => {
  const lines = fs.readFileSync("./input", "utf8").split(os.EOL);
  const data = {};
  for (let line of lines) {
    const [hostBag, nestedBagsStr] = line.split(" bags contain ");
    data[hostBag] = {};
    if (!nestedBagsStr.startsWith("no other bags")) {
      const nestedBags = nestedBagsStr.split(", ");
      for (let nestedBag of nestedBags) {
        const [, count, bagType] = nestedBag.match(/(\d)\s(\w+\s\w+)/);
        data[hostBag][bagType] = count;
      }
    }
  }

  return data;
};

const findPossibleHostBags = (bagRules, bagType) => {
  return Object.entries(bagRules)
    .filter(([key, value]) => value[bagType])
    .map(([key]) => key);
};

const run = () => {
  const bagRules = parseInput();
  const q = ["shiny gold"];
  const res = [];
  while (q.length) {
    const type = q.shift();
    const hostBags = findPossibleHostBags(bagRules, type);
    res.push(...hostBags);
    q.push(...hostBags);
  }

  const resSet = new Set(res);
  console.log(resSet.size);
};

run();
