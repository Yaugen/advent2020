const { run } = require("./01");

describe("25-01", () => {
  test("test result", () => {
    expect(run("testInput")).toEqual(14897079);
  });
  test("solution result", () => {
    expect(run("input")).toEqual(6408263);
  });
});
