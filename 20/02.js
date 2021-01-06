const fs = require("fs");
const os = require("os");

const { rotate } = require("./utils");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split(os.EOL + os.EOL);
};

const edgeToInt = (edgeStr) => {
  return parseInt(edgeStr.replaceAll(".", "0").replaceAll("#", "1"), 2);
};

const mapTileToVariants = (tileStr) => {
  const [tileMeta, ...data] = tileStr.split(os.EOL);
  const [, tileIdStr] = tileMeta.match(/(\d+)/);
  const tileId = Number(tileIdStr);

  let tileData = data.map((line) => line.split(""));
  let variants = [];
  for (let flip = 0; flip < 2; flip += 1) {
    for (let rotation = 0; rotation < 4; rotation += 1) {
      variants.push({
        img: tileData.slice(1, -1).map((line) => line.slice(1, -1).join("")),
        edges: [
          edgeToInt(tileData[0].join("")),
          edgeToInt(
            tileData.reduce((acc, line) => acc + line[line.length - 1], "")
          ),
          edgeToInt(tileData[tileData.length - 1].join("")),
          edgeToInt(tileData.reduce((acc, line) => acc + line[0], "")),
        ],
      });
      tileData = rotate(tileData);
    }
    tileData = tileData.reverse();
  }

  return { tileId, variants };
};

const connectTiles = (tiles) => {
  return tiles
    .map((tile) => [
      tile,
      tiles
        .filter((t) => t !== tile)
        .filter((t) =>
          t.variants[0].edges.some((id) =>
            tile.variants.some((t) => t.edges.some((edge) => edge === id))
          )
        ),
    ])
    .reduce(
      (map, [tile, tiles]) => ({
        ...map,
        [tile.tileId]: tiles,
      }),
      {}
    );
};

const RIGHT = 1;
const DOWN = 2;
const findMatchingPiece = (tilesMap, piece, side) =>
  tilesMap[piece.tileId]
    .map((tile) => ({
      tileId: tile.tileId,
      variant: tile.variants.find(
        (variant) => piece.variant.edges[side] === variant.edges[side ^ 2]
      ),
    }))
    .find((p) => p.variant);

const orderImagePieces = (tilesSet, tilesMap) => {
  const [cornerTileId] = Object.entries(tilesMap).find(
    ([, tiles]) => tiles.length === 2
  );
  const cornerTile = tilesSet.find(
    (tile) => tile.tileId === Number(cornerTileId)
  );
  const matchingEdges = new Set(
    tilesMap[cornerTileId].flatMap((tile) =>
      tile.variants.flatMap((variant) => variant.edges)
    )
  );
  const upperLeftVariant = cornerTile.variants.find(
    ({ edges: [, right, down] }) =>
      [right, down].every((edge) => matchingEdges.has(edge))
  );

  let imagePiece = { tileId: cornerTile.tileId, variant: upperLeftVariant };
  const image = [[]];
  while (imagePiece) {
    image[image.length - 1].push(imagePiece);
    imagePiece = findMatchingPiece(tilesMap, imagePiece, RIGHT);
    if (!imagePiece) {
      const pieceAbove = image[image.length - 1][0];
      imagePiece = findMatchingPiece(tilesMap, pieceAbove, DOWN);
      if (imagePiece) {
        image.push([]);
      }
    }
  }
  return image.map((row) => row.map((piece) => piece.variant.img));
};

const assembleImage = (imagePieces) => {
  const image = [];
  const SIZE = imagePieces[0][0].length;
  imagePieces.forEach((pieceRow, pieceRowIndex) => {
    image.push(...Array(SIZE).fill(""));
    pieceRow.forEach((piece) => {
      piece.forEach((row, rowIndex) => {
        image[pieceRowIndex * SIZE + rowIndex] += row;
      });
    });
  });

  return image.map((line) => line.split(""));
};

const getMonster = () => {
  const monster = [
    "                  # ",
    "#    ##    ##    ###",
    " #  #  #  #  #  #   ",
  ].map((line) => line.split(""));
  return {
    monsterCoords: monster.flatMap((row, y) =>
      row.reduce(
        (coords, cell, x) => (cell === "#" ? [...coords, [x, y]] : coords),
        []
      )
    ),
    monsterHeight: monster.length,
    monsterWidth: monster[0].length,
  };
};

const findMonster = (image) => {
  const { monsterHeight, monsterWidth, monsterCoords } = getMonster();
  let img = image;
  hunt: for (let flip = 0; flip < 2; flip += 1) {
    for (let rotation = 0; rotation < 4; rotation += 1) {
      for (let x = 0; x < img[0].length - monsterWidth; x += 1) {
        for (let y = 0; y < img.length - monsterHeight; y += 1) {
          const monsterFound = monsterCoords.every(
            ([dx, dy]) => img[y + dy][x + dx] === "#"
          );
          if (monsterFound) {
            break hunt;
          }
        }
      }
      img = rotate(img);
    }
    img = img.reverse();
  }

  for (let x = 0; x < img[0].length - monsterWidth; x += 1) {
    for (let y = 0; y < img.length - monsterHeight; y += 1) {
      const monsterFound = monsterCoords.every(
        ([dx, dy]) => img[y + dy][x + dx] === "#"
        // || img[y + dy][x + dx] === "O"
      );
      if (monsterFound) {
        monsterCoords.forEach(([dx, dy]) => {
          img[y + dy][x + dx] = "O";
        });
      }
    }
  }

  let emptyCount = 0;
  for (let x = 0; x < img[0].length; x += 1) {
    for (let y = 0; y < img.length; y += 1) {
      if (img[y][x] === "#") {
        emptyCount += 1;
      }
    }
  }

  return emptyCount;
};

const process = (input) => {
  const tilesSet = input.map(mapTileToVariants);
  const tilesMap = connectTiles(tilesSet);
  const imagePieces = orderImagePieces(tilesSet, tilesMap);
  const image = assembleImage(imagePieces);
  return findMonster(image);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
