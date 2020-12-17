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

const changeWaypointPos = (curPos, dir, amount) => {
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

const rotateWaypoint = (curPos, degrees) => {
  let newDir = curPos.dir + degrees / 90;
  newDir %= 4;
  newDir = newDir < 0 ? 4 - Math.abs(newDir) : newDir;

  let newPos;
  const dirDiff = newDir - curPos.dir;

  if (Math.abs(dirDiff) === 0) {
    newPos = { x: curPos.x, y: curPos.y };
  } else if (Math.abs(dirDiff) === 2) {
    newPos = { x: -1 * curPos.x, y: -1 * curPos.y };
  } else if (dirDiff === 1 || dirDiff === -3) {
    newPos = { x: curPos.y, y: -1 * curPos.x };
  } else {
    newPos = { x: -1 * curPos.y, y: curPos.x };
  }

  return { ...newPos, dir: newDir };
};

const moveShip = (startPos, waypointPos, times) => ({
  x: startPos.x + waypointPos.x * times,
  y: startPos.y + waypointPos.y * times,
});

const process = (cmds) => {
  let shipPos = { x: 0, y: 0 };
  let waypointPos = { x: 10, y: 1, dir: DIRS.EAST };

  for (let { op, amount } of cmds) {
    switch (op) {
      case "N":
        waypointPos = changeWaypointPos(waypointPos, DIRS.NORTH, amount);
        break;
      case "S":
        waypointPos = changeWaypointPos(waypointPos, DIRS.SOUTH, amount);
        break;
      case "E":
        waypointPos = changeWaypointPos(waypointPos, DIRS.EAST, amount);
        break;
      case "W":
        waypointPos = changeWaypointPos(waypointPos, DIRS.WEST, amount);
        break;
      case "L":
        waypointPos = rotateWaypoint(waypointPos, -amount);
        break;
      case "R":
        waypointPos = rotateWaypoint(waypointPos, amount);
        break;
      case "F":
        shipPos = moveShip(shipPos, waypointPos, amount);
    }
  }
  return shipPos;
};

const run = (inputFile) => {
  const cmds = parseInput(inputFile);
  const { x, y } = process(cmds);
  return Math.abs(x) + Math.abs(y);
};

module.exports = {
  DIRS,
  rotateWaypoint,
  changePos: changeWaypointPos,
  process,
  run,
};
