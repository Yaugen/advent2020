const { DIRS, changeDirection, run } = require("./01");

describe("12-01-changeDirection", () => {
  it("rotate 90 from NORTH should face EAST", () => {
    expect(changeDirection({ dir: DIRS.NORTH }, 90)).toEqual({
      dir: DIRS.EAST,
    });
  });
  it("rotate 360 NORTH should face NORTH", () => {
    expect(changeDirection({ dir: DIRS.NORTH }, 360)).toEqual({
      dir: DIRS.NORTH,
    });
  });
  it("rotate 180 WEST should fase EAST", () => {
    expect(changeDirection({ dir: DIRS.WEST }, 180)).toEqual({
      dir: DIRS.EAST,
    });
  });
  it("rotate -90 from NORTH should face WEST", () => {
    expect(changeDirection({ dir: DIRS.NORTH }, -90)).toEqual({
      dir: DIRS.WEST,
    });
  });
});

describe("12-01", () => {
  it("test result", () => {
    expect(run("/testInput")).toEqual(25);
  });
  it("solution result", () => {
    expect(run("/input")).toEqual(820);
  });
});
