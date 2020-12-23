const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs.readFileSync(__dirname + "/" + inputFileName, "utf8").split(os.EOL);
};

const CELL_VALUES = {
  ACTIVE: "#",
  INACTIVE: ".",
};

// space[w][z][y][x]
const createSpace = (size) => {
  return Array(size)
    .fill(0)
    .map(() =>
      Array(size)
        .fill(0)
        .map(() =>
          Array(size)
            .fill(0)
            .map(() => Array(size).fill(CELL_VALUES.INACTIVE))
        )
    );
};

const traverseSpace = (space, cb) => {
  space.forEach((wArea, w) =>
    wArea.forEach((zArea, z) =>
      zArea.forEach((yArea, y) =>
        yArea.forEach((item, x) => cb([w, z, y, x], item))
      )
    )
  );
};

const getCellValue = (space, [w, z, y, x]) => {
  const SIZE = space.length;
  if (w < 0 || w >= SIZE) {
    return CELL_VALUES.INACTIVE;
  }
  if (z < 0 || z >= SIZE) {
    return CELL_VALUES.INACTIVE;
  }
  if (y < 0 || y >= SIZE) {
    return CELL_VALUES.INACTIVE;
  }
  if (x < 0 || x >= SIZE) {
    return CELL_VALUES.INACTIVE;
  }
  return space[w][z][y][x];
};

const getNeighbours = (space, [w, z, y, x]) => {
  const neighbours = [];
  for (let i = w - 1; i <= w + 1; i++) {
    for (let j = z - 1; j <= z + 1; j++) {
      for (let k = y - 1; k <= y + 1; k++) {
        for (let g = x - 1; g <= x + 1; g++) {
          if (i !== w || j !== z || k !== y || g !== x) {
            neighbours.push(getCellValue(space, [i, j, k, g]));
          }
        }
      }
    }
  }
  return neighbours;
};

const getNextGeneration = (space) => {
  const SIZE = space.length;
  const newSpace = createSpace(SIZE);
  traverseSpace(space, (coords, cellValue) => {
    const [w, z, y, x] = coords;
    const neighbours = getNeighbours(space, coords);
    const activeNeighboursCount = neighbours.reduce(
      (acc, item) => (item === CELL_VALUES.ACTIVE ? acc + 1 : acc),
      0
    );

    // if (activeNeighboursCount > 0) {
    //   console.log(
    //     `[${z} ${y} ${x}] ${cellValue} - active neighbours ${activeNeighboursCount}`
    //   );
    // }

    if (cellValue === CELL_VALUES.ACTIVE) {
      if (activeNeighboursCount === 2 || activeNeighboursCount === 3) {
        newSpace[w][z][y][x] = CELL_VALUES.ACTIVE;
      } else {
        newSpace[w][z][y][x] = CELL_VALUES.INACTIVE;
      }
    } else if (cellValue === CELL_VALUES.INACTIVE) {
      if (activeNeighboursCount === 3) {
        newSpace[w][z][y][x] = CELL_VALUES.ACTIVE;
      } else {
        newSpace[w][z][y][x] = CELL_VALUES.INACTIVE;
      }
    }
  });

  return newSpace;
};

const printSpace = (space) => {
  const SIZE = space.length;

  for (let w = 0; w < SIZE; w++) {
    for (let z = 0; z < SIZE; z++) {
      const area = space[w][z].reduce(
        (acc, line) => acc + line.join("") + "\n",
        ""
      );
      if (area.includes(CELL_VALUES.ACTIVE)) {
        console.log(`W=${w} Z=${z}`);
        console.log(area);
      }
    }
  }
};

const process = (input) => {
  const CYCLES = 6;
  const INPUT_SIZE = input.length;
  const INPUT_SIZE_MIDDLE = Math.round(INPUT_SIZE / 2);
  const SIZE = INPUT_SIZE + 15;
  const SIZE_MIDDLE = Math.round(SIZE / 2);
  const INPUT_OFFSET = SIZE_MIDDLE - INPUT_SIZE_MIDDLE;
  let space = createSpace(SIZE);

  for (let i = 0; i < INPUT_SIZE; i++) {
    for (let j = 0; j < INPUT_SIZE; j++) {
      space[SIZE_MIDDLE][SIZE_MIDDLE][INPUT_OFFSET + i][INPUT_OFFSET + j] =
        input[i][j];
    }
  }

  // console.log("INITIAL");
  // printSpace(space);
  for (let gen = 0; gen < CYCLES; gen++) {
    space = getNextGeneration(space);
    // console.log(`GEN ${gen + 1}`);
    // printSpace(space);
  }

  let activeCount = 0;
  traverseSpace(space, (coords, value) => {
    if (value === CELL_VALUES.ACTIVE) {
      activeCount += 1;
    }
  });

  return activeCount;
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

run("/testInput");

module.exports = { run };
