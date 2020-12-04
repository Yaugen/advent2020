const fs = require("fs");
const os = require("os");

const readInput = () => {
  return fs.readFileSync("./input", "utf8").split(os.EOL);
};

const parseRule = (ruleStr) => {
  const [, min, max, char, line] = ruleStr.match(/(\d+)-(\d+)\s(.+):\s(.+)/);
  return { min, max, char, line };
};

const checkRule = (line, validateChar, min, max) => {
  const minC = line[min - 1];
  const maxC = line[max - 1];
  return minC !== maxC && (minC === validateChar || maxC === validateChar);
};

const run = async () => {
  let validCounter = 0;
  for (let inputLine of readInput()) {
    const { min, max, char, line } = parseRule(inputLine);
    if (checkRule(line, char, min, max)) {
      validCounter += 1;
      console.log(inputLine, min, max, "valid");
    } else {
      console.log(inputLine, min, max, "invalid");
    }
  }
  console.log(validCounter);
};

run();
