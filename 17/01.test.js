const { run } = require("./01");

describe("17-01", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(112);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(207);
  });
});
