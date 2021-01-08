const { run } = require("./02");

describe("24-02", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(2208);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(3831);
  });
});
