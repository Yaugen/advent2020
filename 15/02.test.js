const { run } = require("./02");

describe("15-02", () => {
  test("test result", () => {
    expect(run("0,3,6")).toEqual(175594);
  });
  test("solution result", () => {
    expect(run("12,1,16,3,11,0")).toEqual(37385);
  });
});
