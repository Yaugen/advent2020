const { run } = require("./01");

describe("22-01", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(306);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(32413);
  });
});
