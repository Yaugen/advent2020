const parseInput = (rawInput) => {
  return rawInput.split(",").map(Number);
};

const process = (input) => {
  const cache = {};
  let lastValue;

  const addToCache = (v, turn) => {
    if (!cache[v]) {
      cache[v] = { prev: turn };
    } else {
      cache[v].prevprev = cache[v].prev;
      cache[v].prev = turn;
    }
    lastValue = v;
  };

  for (let i = 1; i <= 2020; i++) {
    if (i <= input.length) {
      addToCache(input[i - 1], i);
    } else {
      const { prev, prevprev } = cache[lastValue];
      if (!prevprev) {
        addToCache(0, i);
      } else {
        addToCache(prev - prevprev, i);
      }
    }
  }
  return lastValue;
};

const run = (rawInput) => {
  return process(parseInput(rawInput));
};

module.exports = { run };
