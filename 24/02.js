const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split(os.EOL)
    .map((line) => {
      const chars = line.split("");
      const output = [];
      while (chars.length) {
        if (chars[0] === "e" || chars[0] === "w") {
          output.push(chars.shift());
        } else {
          output.push(chars.shift() + chars.shift());
        }
      }
      return output;
    });
};

const offsets = {
  ne: [
    [-1, 1],
    [-1, 0],
  ],
  e: [
    [0, 1],
    [0, 1],
  ],
  se: [
    [1, 1],
    [1, 0],
  ],
  sw: [
    [1, 0],
    [1, -1],
  ],
  w: [
    [0, -1],
    [0, -1],
  ],
  nw: [
    [-1, 0],
    [-1, -1],
  ],
};

const COLOR = {
  WHITE: "WHITE",
  BLACK: "BLACK",
};

const getTileCoordinates = (directions) => {
  let coords = [0, 0];
  for (let dir of directions) {
    const [dx, dy] = offsets[dir][Math.abs(coords[0] % 2)];
    coords[0] += dx;
    coords[1] += dy;
  }
  return coords;
};

const getInitialMap = (input) => {
  const coords = input.map(getTileCoordinates);
  const map = new Map();
  for (let coord of coords) {
    const key = String(coord);
    if (map.has(key)) {
      map.delete(key);
    } else {
      map.set(key, coord);
    }
  }
  return map;
};

const getNeighbourCoords = ([x, y]) => {
  return Object.values(offsets)
    .map((offsetPair) => offsetPair[Math.abs(x % 2)])
    .map(([dx, dy]) => [x + dx, y + dy]);
};

const getNextState = (initialMap) => {
  const scope = new Map();
  initialMap.forEach((coord) => {
    scope.set(String(coord), coord);
    getNeighbourCoords(coord).forEach((neighbourCoord) => {
      scope.set(String(neighbourCoord), neighbourCoord);
    });
  });
  const newMap = new Map();
  scope.forEach((coord) => {
    const blackNeighbours = getNeighbourCoords(coord).reduce(
      (count, neighbourCoord) =>
        initialMap.has(String(neighbourCoord)) ? count + 1 : count,
      0
    );

    if (initialMap.has(String(coord))) {
      if (blackNeighbours === 1 || blackNeighbours === 2) {
        newMap.set(String(coord), coord);
      }
    } else {
      if (blackNeighbours === 2) {
        newMap.set(String(coord), coord);
      }
    }
  });

  return newMap;
};

const runMutations = (initialMap, iterations) => {
  let map = initialMap;
  for (let i = 0; i < iterations; i += 1) {
    map = getNextState(map);
  }
  return map;
};

const process = (input) => {
  const map = getInitialMap(input);
  const mutatedMap = runMutations(map, 100);
  return mutatedMap.size;
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
