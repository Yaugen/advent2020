const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs.readFileSync(__dirname + "/" + inputFileName, "utf8").split(os.EOL);
};

// safe with negative numbers unlike JS % operator
const absoluteModulo = (a, b) => ((a % b) + b) % b;

// returns x where (a * x) % b == 1
// https://rosettacode.org/wiki/Modular_inverse
const getInverse = (a, mod) => {
  const b = a % mod;
  for (let i = 1; i < mod; i++) {
    if ((b * i) % mod === 1) {
      return i;
    }
  }
  return 1;
};

const chineseRemainderTheorem = (lines) => {
  // x =- a (mod n)
  // x - some unknown, constant value of t
  // a - bus number MINUS offset % bus number
  // n - cycle length (= bus number)

  // to solve each row, we also need
  // N - all n's added up
  // nU = N / n
  // i - inverse modulo

  const N = lines.reduce((acc, cur) => {
    if (cur === "x") {
      return acc;
    }
    return acc === null ? cur : acc * cur;
  }, null);

  const sum = lines.reduce((acc, cur, idx) => {
    if (cur === "x") {
      return acc;
    }
    const a = absoluteModulo(cur - idx, cur);
    const nU = N / cur;
    const inverse = getInverse(nU, cur);
    // console.log(`x = ${a} (mod ${cur})`);
    return acc + BigInt(BigInt(a) * BigInt(nU) * BigInt(inverse));
  }, 0n);

  return sum % BigInt(N);
};

const findMatchingT = (buses) => {
  let busesInt = buses.map((bus) => (bus === "x" ? "x" : parseInt(bus, 10)));
  return chineseRemainderTheorem(busesInt);
};

const process = (input) => {
  return findMatchingT(input[1].split(","));
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run };
