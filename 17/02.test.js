const { run } = require("./02");

describe("17-02", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(848);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(2308);
  });
});
