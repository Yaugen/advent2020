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

const getRulesForKey = (inputRules, rootRuleKey) => {
  const parsedRules = parseRules(inputRules);
  return resolveRule(parsedRules, rootRuleKey);
};

const countParts = (line, parts) => {
  let counter = 0;
  while (true) {
    const part = parts.find((part) => line.startsWith(part));
    if (!part) {
      break;
    }
    line = line.slice(part.length);
    counter += 1;
  }
  return [line, counter];
};

const process = (input) => {
  const partsFor42 = getRulesForKey(input.rules, 42);
  const partsFor31 = getRulesForKey(input.rules, 31);

  let counter = 0;
  for (let line of input.lines) {
    let firstPartCounter;
    [line, firstPartCounter] = countParts(line, partsFor42);
    let secondPartCounter;
    [line, secondPartCounter] = countParts(line, partsFor31);

    if (
      line.length === 0 &&
      secondPartCounter > 0 &&
      firstPartCounter > secondPartCounter
    ) {
      counter += 1;
    } else {
    }
  }
  return counter;
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

run("testInput_02_initial.json");

module.exports = { run };
