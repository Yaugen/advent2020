const { union, diff, intersection } = require("./utils");

describe("21-utils", () => {
  describe("union", () => {
    it("should produce union of two sets", () => {
      expect(union(new Set([1, 2]), new Set([2, 3]))).toEqual(
        new Set([1, 2, 3])
      );
    });
  });
  describe("diff", () => {
    it("should produce diff of two sets", () => {
      expect(diff(new Set([1, 2]), new Set([2, 3]))).toEqual(new Set([1]));
      expect(diff(new Set([1, 2]), new Set([3, 4]))).toEqual(new Set([1, 2]));
    });
  });
  describe("intersection", () => {
    it("should produce intersection of two sets", () => {
      expect(intersection(new Set([1, 2]), new Set([2, 3]))).toEqual(
        new Set([2])
      );
      expect(intersection(new Set([1, 2]), new Set([3, 4]))).toEqual(
        new Set([])
      );
    });
  });
});
