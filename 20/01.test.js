const { run } = require("./01");

describe("20-01", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(20899048083289);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(64802175715999);
  });
});
