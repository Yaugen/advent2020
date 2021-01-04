const { run } = require("./02");

describe("19-02", () => {
  test("test result initial", () => {
    expect(run("testInput_02_initial.json")).toEqual(12);
  });
  test("solution result", () => {
    expect(run("/input.json")).toEqual(379);
  });
});
