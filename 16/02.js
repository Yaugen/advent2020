const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return JSON.parse(fs.readFileSync(__dirname + "/" + inputFileName, "utf8"));
};

const parseRules = (rules) => {
  return rules.map((ruleStr) => {
    const [, rowName, fromA, toA, fromB, toB] = ruleStr.match(
      /(.*):\s(\d+)-(\d+) or (\d+)-(\d+)/
    );
    return {
      rowName,
      validation: (v) => (v >= fromA && v <= toA) || (v >= fromB && v <= toB),
    };
  });
};

const guessRowNames = (rules, tickets) => {
  const rowCount = rules.length;
  const rowNameMapping = rules.reduce((acc, r) => {
    acc[r.rowName] = Array(rowCount)
      .fill(0)
      .map((_, i) => i);
    return acc;
  }, {});

  tickets.forEach((ticketStr) => {
    ticketStr
      .split(",")
      .map(Number)
      .forEach((rowValue, rowIndex) => {
        const failingRules = rules.filter((r) => !r.validation(rowValue));
        failingRules.forEach((failingRule) => {
          rowNameMapping[failingRule.rowName] = rowNameMapping[
            failingRule.rowName
          ].filter((n) => n !== rowIndex);
        });
      });
  });
  let found = true;
  while (found) {
    found = false;
    for (let rowName of Object.keys(rowNameMapping)) {
      if (rowNameMapping[rowName].length === 1) {
        const value = rowNameMapping[rowName][0];
        for (let r of Object.keys(rowNameMapping)) {
          if (r !== rowName && rowNameMapping[r].includes(value)) {
            rowNameMapping[r] = rowNameMapping[r].filter((v) => v !== value);
            found = true;
          }
        }
      }
    }
  }

  return Object.entries(rowNameMapping).reduce((acc, [key, value]) => {
    acc[key] = value[0];
    return acc;
  }, {});
};

const getValidTickets = (rules, tickets) => {
  return tickets.filter((ticket) => {
    return ticket
      .split(",")
      .map(Number)
      .every((t) => rules.some((r) => r.validation(t)));
  });
};

const process = (input) => {
  const rules = parseRules(input.rules);
  const validTickets = getValidTickets(rules, input["nearby tickets"]);
  const rowNameMapping = guessRowNames(rules, validTickets);
  const ticketEntries = input["your ticket"][0].split(",").map(Number);
  const result = Object.entries(rowNameMapping)
    .filter(([key]) => key.startsWith("departure"))
    .reduce((mul, [_, index]) => mul * ticketEntries[index], 1);
  return result;
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);

  return process(input);
};

module.exports = { run };
