const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split(os.EOL + os.EOL);
};

const getTileInfo = (tileStr) => {
  const [tileMeta, ...data] = tileStr.split(os.EOL);
  const [, tileIdStr] = tileMeta.match(/(\d+)/);
  const tileId = Number(tileIdStr);

  const tileData = data.map((line) => line);
  let borders = [
    tileData[0],
    tileData.reduce((acc, line) => acc + line[line.length - 1], ""),
    tileData[tileData.length - 1],
    tileData.reduce((acc, line) => acc + line[0], ""),
  ];

  return { tileId, tileData, borders, matchCount: 0 };
};

const reverse = (str) => str.split("").reverse().join("");

const hasMatchingBorders = (tileA, tileB) => {
  let matchingBorder = tileA.borders.find((border) =>
    tileB.borders.includes(border)
  );
  if (matchingBorder) {
    return true;
  }

  const reversedBorders = tileA.borders.map(reverse);
  matchingBorder = reversedBorders.find((border) =>
    tileB.borders.includes(border)
  );
  if (matchingBorder) {
    return true;
  }

  return false;
};

const findMatches = (tiles) => {
  for (let i = 0; i < tiles.length; i += 1) {
    for (let j = i + 1; j < tiles.length; j += 1) {
      if (hasMatchingBorders(tiles[i], tiles[j])) {
        tiles[i].matchCount += 1;
        tiles[j].matchCount += 1;
      }
    }
  }
};

const process = (input) => {
  const tiles = input.map(getTileInfo);

  findMatches(tiles);

  return tiles
    .filter(({ matchCount }) => matchCount === 2)
    .reduce((acc, { tileId }) => acc * tileId, 1);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
