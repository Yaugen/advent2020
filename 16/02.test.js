const { run } = require("./02");

describe("16-02", () => {
  test("test result", () => {
    expect(run("/testInput02.json")).toEqual(1);
  });
  test("solution result", () => {
    expect(run("/input.json")).toEqual(279139880759);
  });
});
