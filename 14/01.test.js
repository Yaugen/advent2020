const { run, applyMask } = require("./01");

describe("applyMask", () => {
  test("1", () => {
    const MASK = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X";
    expect(applyMask(11, MASK)).toEqual(73);
    expect(applyMask(101, MASK)).toEqual(101);
  });
});

describe("14-01", () => {
  test("test result", () => {
    expect(run("/testInput01")).toEqual(165);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(6513443633260);
  });
});
