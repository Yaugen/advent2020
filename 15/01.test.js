const { run } = require("./01");

describe("15-01", () => {
  test("test result", () => {
    expect(run("0,3,6")).toEqual(436);
  });
  test("solution result", () => {
    expect(run("12,1,16,3,11,0")).toEqual(1696);
  });
});
