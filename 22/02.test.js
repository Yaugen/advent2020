const { run } = require("./02");

describe("22-02", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(291);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(31596);
  });
});
