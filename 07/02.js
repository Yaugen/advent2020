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

const getCount = (rules, bagType) => {
  const nestedTypes = Object.entries(rules[bagType]);
  const nestedCountSum = nestedTypes.reduce(
    (acc, [type, count]) => acc + count * getCount(rules, type),
    1
  );
  return nestedCountSum || 1;
};

const run = () => {
  const bagRules = parseInput();
  console.log(getCount(bagRules, "shiny gold") - 1);
};

run();
