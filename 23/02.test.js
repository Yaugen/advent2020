const { run } = require("./02");

describe("23-02", () => {
  test("test result", () => {
    expect(run("/testInput", 10000000, 1000000)).toEqual(149245887792);
  });
  test("solution result", () => {
    expect(run("/input", 10000000, 1000000)).toEqual(2029056128);
  });
});
