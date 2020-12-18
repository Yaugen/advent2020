const fs = require("fs");

fs.readFile("./input", "utf8", (err, data) => {
  const lines = data.split("\n");
  const timestamp = parseInt(lines[0], 10);
  const buses = lines[1].split(",");
  const delays = buses
    .filter((bus) => bus !== "x")
    .map((bus) => ({ bus: bus, delay: bus - (timestamp % parseInt(bus, 10)) }))
    .sort((a, b) => a.delay - b.delay);
  console.log(
    `The shortest delay is ${delays[0].delay} minutes on bus ${delays[0].bus}.`
  );
  console.log(`The desired pattern occurs at ${findMatchingT(buses)}.`);
});
