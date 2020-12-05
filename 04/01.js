const fs = require("fs");
const os = require("os");

const parseInput = () => {
  const data = [];
  const lines = fs.readFileSync("./input", "utf8").split(os.EOL);
  let currentItem = {};
  for (let line of lines) {
    const lineItems = line.split(" ");
    if (!line) {
      data.push(currentItem);
      currentItem = {};
    } else {
      lineItems.forEach((i) => {
        const [key, value] = i.split(":");
        currentItem[key] = value;
      });
    }
  }
  data.push(currentItem);
  return data;
};

// const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const validate = (entry) => {
  const keys = Object.keys(entry);
  return requiredFields.every((f) => keys.includes(f));
};

const run = () => {
  const inputData = parseInput();
  const validData = inputData.filter(validate);
  console.log(validData.length);
};

run();
