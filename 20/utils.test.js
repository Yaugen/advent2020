const { rotate } = require("./utils");

describe("20-utils", () => {
  describe("rotate", () => {
    it("should rotate NxM matrix", () => {
      const actual = rotate([
        [1, 2, 3],
        [4, 5, 6],
      ]);
      const expected = [
        [4, 1],
        [5, 2],
        [6, 3],
      ];
      expect(actual).toEqual(expected);
    });

    it("should rotate MxN matrix", () => {
      const actual = rotate([
        [0, 1],
        [2, 3],
        [4, 5],
      ]);
      const expected = [
        [4, 2, 0],
        [5, 3, 1],
      ];
      expect(actual).toEqual(expected);
    });

    it("should rotate NxN matrix", () => {
      const actual = rotate([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
      const expected = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
      ];
      expect(actual).toEqual(expected);
    });
  });
});
