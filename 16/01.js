const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return JSON.parse(fs.readFileSync(__dirname + "/" + inputFileName, "utf8"));
};

const createValidation = (rules) => {
  return rules.reduce((acc, ruleStr) => {
    const [, fromA, toA, fromB, toB] = ruleStr.match(
      /:\s(\d+)-(\d+) or (\d+)-(\d+)/
    );
    return [
      ...acc,
      (v) => v >= fromA && v <= toA,
      (v) => v >= fromB && v <= toB,
    ];
  }, []);
};

const process = (input) => {
  const validationPredicates = createValidation(input.rules);
  const failedValidations = input["nearby tickets"]
    .map((ticketList) => {
      return ticketList
        .split(",")
        .map(Number)
        .filter((n) => !validationPredicates.some((p) => p(n)));
    })
    .flat();
  return failedValidations.reduce((sum, n) => sum + n, 0);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
