const { run } = require("./02");

describe("13-02", () => {
  test("test result", () => {
    expect(run("/testInput") === BigInt(1068781)).toBeTruthy();
  });
  test("solution result", () => {
    expect(run("/input") === BigInt(807435693182510)).toBeTruthy();
  });
});
