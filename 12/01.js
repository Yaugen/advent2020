const fs = require("fs");
const os = require("os");

const parseInput = (inputFile) => {
  return fs
    .readFileSync(__dirname + inputFile, "utf8")
    .split(os.EOL)
    .map((line) => ({ op: line.slice(0, 1), amount: Number(line.slice(1)) }));
};

const DIRS = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

const changePos = (curPos, dir, amount) => {
  const newPos = { x: curPos.x, y: curPos.y };
  switch (dir) {
    case DIRS.NORTH:
      newPos.y += amount;
      break;
    case DIRS.SOUTH:
      newPos.y -= amount;
      break;
    case DIRS.EAST:
      newPos.x += amount;
      break;
    case DIRS.WEST:
      newPos.x -= amount;
      break;
  }
  return { ...curPos, ...newPos };
};

const changeDirection = (curPos, degrees) => {
  let newDir = curPos.dir + degrees / 90;
  newDir %= 4;
  newDir = newDir < 0 ? 4 - Math.abs(newDir) : newDir;
  return { ...curPos, dir: newDir };
};

const process = (cmds) => {
  let curPos = { x: 0, y: 0, dir: DIRS.EAST };

  for (let { op, amount } of cmds) {
    switch (op) {
      case "N":
        curPos = changePos(curPos, DIRS.NORTH, amount);
        break;
      case "S":
        curPos = changePos(curPos, DIRS.SOUTH, amount);
        break;
      case "E":
        curPos = changePos(curPos, DIRS.EAST, amount);
        break;
      case "W":
        curPos = changePos(curPos, DIRS.WEST, amount);
        break;
      case "L":
        curPos = changeDirection(curPos, -amount);
        break;
      case "R":
        curPos = changeDirection(curPos, amount);
        break;
      case "F":
        curPos = changePos(curPos, curPos.dir, amount);
    }
  }
  return curPos;
};

const run = (inputFile) => {
  const cmds = parseInput(inputFile);
  const { x, y } = process(cmds);
  return Math.abs(x) + Math.abs(y);
};

module.exports = { DIRS, changeDirection, changePos, process, run };
