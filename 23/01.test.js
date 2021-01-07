const { run } = require("./01");

describe.skip("23-01", () => {
  test("test result", () => {
    expect(run("/testInput", 10)).toEqual(92658374);
  });
  test("test result", () => {
    expect(run("/testInput", 100)).toEqual(67384529);
  });
  test("solution result", () => {
    expect(run("/input", 100)).toEqual(89573246);
  });
});
