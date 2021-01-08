const { run } = require("./01");

describe("24-01", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(10);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(322);
  });
});
