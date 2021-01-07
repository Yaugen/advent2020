const { run } = require("./01");

describe("21-01", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(5);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(2410);
  });
});
