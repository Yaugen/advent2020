const { run } = require("./02");

describe("20-02", () => {
  test("test result", () => {
    expect(run("testInput")).toEqual(273);
  });
  test("solution result", () => {
    expect(run("input")).toEqual(2146);
  });
});
