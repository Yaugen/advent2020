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

const validateRequired = (entry) => {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const keys = Object.keys(entry);
  return requiredFields.every((f) => keys.includes(f));
};

const validateYear = (value, min, max) => {
  return value.match(/^\d{4}$/) && Number(value) >= min && Number(value) <= max;
};

const validateHeight = (value) => {
  const match = value.match(/(\d+)(cm|in)$/);
  if (!match) {
    return false;
  }
  const [, heightStr, dim] = match;
  const height = Number(heightStr);
  return (
    (dim === "cm" && height >= 150 && height <= 193) ||
    (dim === "in" && height >= 59 && height <= 76)
  );
};

const validateHairColor = (value) => {
  return !!value.match(/^#[0-9a-f]{6}$/);
};

const validateEyeColor = (value) => {
  const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return colors.includes(value);
};

const validatePassportId = (value) => {
  return value.match(/^\d{9}$/);
};

const validate = (entry) => {
  return (
    validateRequired(entry) &&
    validateYear(entry.byr, 1920, 2002) &&
    validateYear(entry.iyr, 2010, 2020) &&
    validateYear(entry.eyr, 2020, 2030) &&
    validateHeight(entry.hgt) &&
    validateHairColor(entry.hcl) &&
    validateEyeColor(entry.ecl) &&
    validatePassportId(entry.pid)
  );
};

const run = () => {
  const inputData = parseInput();
  const validData = inputData.filter(validate);
  console.log(validData.length);
};

run();
