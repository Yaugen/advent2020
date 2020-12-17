const { DIRS, rotateWaypoint, run } = require("./02");

describe("12-02-rotateWaypoint", () => {
  it("rotate 90 from NORTH should face EAST", () => {
    expect(rotateWaypoint({ dir: DIRS.NORTH, x: -1, y: 2 }, 90)).toEqual({
      dir: DIRS.EAST,
      x: 2,
      y: 1,
    });
  });
  it("rotate 360 NORTH should face NORTH", () => {
    expect(rotateWaypoint({ dir: DIRS.NORTH, x: -1, y: 2 }, 360)).toEqual({
      dir: DIRS.NORTH,
      x: -1,
      y: 2,
    });
  });
  it("rotate 180 WEST should face EAST", () => {
    expect(rotateWaypoint({ dir: DIRS.WEST, x: -2, y: -1 }, 180)).toEqual({
      dir: DIRS.EAST,
      x: 2,
      y: 1,
    });
  });
  it("rotate -90 from NORTH should face WEST", () => {
    expect(rotateWaypoint({ dir: DIRS.NORTH, x: -1, y: 2 }, -90)).toEqual({
      dir: DIRS.WEST,
      x: -2,
      y: -1,
    });
  });
});

describe("12-02", () => {
  it("test result", () => {
    expect(run("/testInput")).toEqual(286);
  });
  it("solution result", () => {
    expect(run("/input")).toEqual(66614);
  });
});
