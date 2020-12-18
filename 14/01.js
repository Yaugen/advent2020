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
    .map((v, i) => (mask[i] === "X" ? v : mask[i]))
    .join("");
  return parseInt(value, 2);
};

const process = (input) => {
  let currentMask;
  let memory = {};

  for (let cmd of input) {
    if (cmd.op === OPS.MASK) {
      currentMask = cmd.value;
    } else {
      memory[cmd.adr] = applyMask(cmd.value, currentMask);
    }
  }

  return Object.values(memory).reduce((sum, v) => sum + v, 0);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run, applyMask };
