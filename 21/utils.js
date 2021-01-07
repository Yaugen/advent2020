const union = (a, b) => new Set([...a, ...b]);
const diff = (a, b) => new Set([...a].filter((x) => !b.has(x)));
const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)));

module.exports = { union, diff, intersection };
