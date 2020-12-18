const { run } = require("./01");

describe("13-01", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(295);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(261);
  });
});
