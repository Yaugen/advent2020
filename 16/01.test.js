const { run } = require("./01");

describe("16-01", () => {
  test("test result", () => {
    expect(run("testInput.json")).toEqual(71);
  });
  test("solution result", () => {
    expect(run("/input.json")).toEqual(27802);
  });
});
