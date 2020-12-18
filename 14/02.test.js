const { run, applyMask, getAdressesFromMask } = require("./02");

describe("14-02", () => {
  test("applyMask", () => {
    const MASK = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X";
    expect(applyMask(42, "000000000000000000000000000000X1001X")).toEqual(
      "000000000000000000000000000000X1101X"
    );
    expect(applyMask(26, "00000000000000000000000000000000X0XX")).toEqual(
      "00000000000000000000000000000001X0XX"
    );
  });

  describe("getAdressesFromMask", () => {
    test("1", () => {
      const mask = "000000000000000000000000000000X1101X";
      const result = getAdressesFromMask(mask).sort((a, b) => a - b);
      const expected = [26, 27, 58, 59].sort((a, b) => a - b);
      expect(result).toEqual(expected);
    });
    test("2", () => {
      const mask = "00000000000000000000000000000001X0XX";
      const result = getAdressesFromMask(mask).sort((a, b) => a - b);
      const expected = [16, 17, 18, 19, 24, 25, 26, 27].sort((a, b) => a - b);
      expect(result).toEqual(expected);
    });
    test("3", () => {
      const mask = "000000000000000000000000000000000001";
      const result = getAdressesFromMask(mask);
      const expected = [1];
      expect(result).toEqual(expected);
    });
  });

  test("test result", () => {
    expect(run("/testInput02")).toEqual(208);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(3442819875191);
  });
});
