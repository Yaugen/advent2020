const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return JSON.parse(fs.readFileSync(__dirname + "/" + inputFileName, "utf8"));
};

const parseRules = (ruleStrs) => {
  return ruleStrs.reduce((acc, str) => {
    const [key, value] = str.split(": ");
    if (value.startsWith('"')) {
      acc[key] = value.replace(/"/g, "");
    } else {
      acc[key] = value.split(" | ").map((item) => item.split(" ").map(Number));
    }
    return acc;
  }, {});
};

const isArrayOfStrings = (arr) => arr.every((item) => typeof item === "string");

const mergeRuleParts = (parts) => {
  return parts.reduce((merged, partItems) => {
    if (!merged.length) {
      merged = partItems.slice();
      return;
    }
    return merged.reduce((acc, mergedHeadItem) => {
      partItems.forEach((partTailItem) => {
        acc.push(mergedHeadItem + partTailItem);
      });
      return acc;
    }, []);
  });
};

const resolveRule = (rules, ruleKey) => {
  if (typeof rules[ruleKey] === "string") {
    return [rules[ruleKey]];
  } else if (isArrayOfStrings(rules[ruleKey])) {
    return rules[ruleKey];
  } else {
    rules[ruleKey] = rules[ruleKey]
      .map((item) => {
        return mergeRuleParts(item.map((key) => resolveRule(rules, key)));
      })
      .flat();
    return rules[ruleKey];
  }
};

const process = (input) => {
  const parsedRules = parseRules(input.rules);
  const ruleToCheck = resolveRule(parsedRules, 0);
  const validLinesCount = input.lines.filter((line) =>
    ruleToCheck.includes(line)
  ).length;
  return validLinesCount;
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
