const fs = require("fs");
const os = require("os");

const EMPTY = "L";
const OCCUPIED = "#";
const FLOOR = ".";

const getMatrix = (width, height, fill) => {
  return Array(width)
    .fill(0)
    .map((_, x) =>
      Array(height)
        .fill(0)
        .map((_, y) => fill(x, y))
    );
};

const parseInput = () => {
  const initialarr = fs
    .readFileSync(__dirname + "/input", "utf8")
    .split(os.EOL)
    .map((l) => l.split(""));
  const width = initialarr[0].length;
  const height = initialarr.length;

  return getMatrix(width, height, (x, y) => initialarr[y][x]);
};

const getSeatInfo = (x, y, field) => {
  const getCell = (x, y) => {
    if (x >= 0 && x < field.length && y >= 0 && y < field[0].length) {
      return field[x][y];
    }
    return undefined;
  };
  const cell = getCell(x, y);
  const neighbours = [
    getCell(x, y - 1),
    getCell(x + 1, y - 1),
    getCell(x + 1, y),
    getCell(x + 1, y + 1),
    getCell(x, y + 1),
    getCell(x - 1, y + 1),
    getCell(x - 1, y),
    getCell(x - 1, y - 1),
  ].filter(Boolean);

  return {
    seat: cell,
    neighbours,
    occupied: neighbours.filter((c) => c === OCCUPIED).length,
    empty: neighbours.filter((c) => c === EMPTY).length,
  };
};

const getNewField = (prevField) => {
  const width = prevField.length;
  const height = prevField[0].length;

  return getMatrix(width, height, (x, y) => {
    const { seat, occupied, empty } = getSeatInfo(x, y, prevField);

    if (seat === EMPTY && occupied === 0) {
      return OCCUPIED;
    }
    if (seat === OCCUPIED && occupied >= 4) {
      return EMPTY;
    }
    return seat;
  });
};

const areFieldsEqual = (aField, bField) => {
  return JSON.stringify(aField) === JSON.stringify(bField);
};

const run = () => {
  let currentField = parseInput();
  while (true) {
    const newField = getNewField(currentField);
    if (areFieldsEqual(currentField, newField)) {
      const occupedCount = newField
        .map((col) => col.join(""))
        .join("")
        .split("")
        .filter((c) => c === OCCUPIED).length;
      console.log(occupedCount);

      return;
    }
    currentField = newField;
  }
};

run();
