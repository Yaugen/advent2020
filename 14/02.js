const fs = require("fs");
const os = require("os");

const parseLine = (line) => {
  if (line.startsWith("mask")) {
    return { op: OPS.MASK, value: line.split("=")[1].trim() };
  }

  const [, addr, value] = line.match(/mem\[(\d+)\] = (\d+)$/);
  return { op: OPS.MEM, adr: Number(addr), value: Number(value) };
};

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split(os.EOL)
    .map(parseLine);
};

const OPS = { MASK: "MASK", MEM: "MEM" };

const applyMask = (intValue, mask) => {
  let value = intValue.toString(2).padStart(36, "0");
  value = value
    .split("")
    .map((v, i) => (mask[i] === "0" ? v : mask[i]))
    .join("");
  return value;
};

const getAdressesFromMask = (adrMask) => {
  if (!adrMask.includes("X")) {
    return [parseInt(adrMask, 2)];
  }

  let adresses = [];
  let acc = 0;
  for (let i = 0; i < adrMask.length; i++) {
    const char = adrMask[i];
    const value = Math.pow(2, adrMask.length - 1 - i);
    if (char === "X") {
      if (!adresses.length) {
        adresses = [value, 0];
      } else {
        adresses = adresses.reduce(
          (acc, item) => [...acc, item, item + value],
          []
        );
      }
    } else if (char === "1") {
      acc += value;
    }
  }
  return adresses.map((v) => v + acc);
};

const process = (input) => {
  let currentMask;
  let memory = {};

  for (let cmd of input) {
    if (cmd.op === OPS.MASK) {
      currentMask = cmd.value;
    } else {
      const adrMask = applyMask(cmd.adr, currentMask);
      const adrs = getAdressesFromMask(adrMask);
      adrs.forEach((adr) => {
        memory[adr] = cmd.value;
      });
    }
  }

  return Object.values(memory).reduce((sum, v) => sum + v, 0);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run, applyMask, getAdressesFromMask };
