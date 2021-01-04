const { run } = require("./01");

describe("19-01", () => {
  test("test result", () => {
    expect(run("testInput.json")).toEqual(2);
  });
  test("solution result", () => {
    expect(run("input.json")).toEqual(235);
  });
});
