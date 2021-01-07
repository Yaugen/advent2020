const { run } = require("./02");

describe("21-02", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual("mxmxvkd,sqjhc,fvjkl");
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(
      "tmp,pdpgm,cdslv,zrvtg,ttkn,mkpmkx,vxzpfp,flnhl"
    );
  });
});
