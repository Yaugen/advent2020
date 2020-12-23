const { run,evaluateExpression } = require("./02");

describe('evaluateExpressions', () => {
  test('1 + 2 * 3 + 4 * 5 + 6 === 231', () => {
    expect(evaluateExpression('1 + 2 * 3 + 4 * 5 + 6')).toEqual(231);
  })
  test('1 + (2 * 3) + (4 * (5 + 6)) === 51', () => {
    expect(evaluateExpression('1 + (2 * 3) + (4 * (5 + 6))')).toEqual(51);
  })
  test('2 * 3 + (4 * 5) === 46', () => {
    expect(evaluateExpression('2 * 3 + (4 * 5)')).toEqual(46);
  })
  test('5 + (8 * 3 + 9 + 3 * 4 * 3) === 1445', () => {
    expect(evaluateExpression('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toEqual(1445);
  })
  test('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) === 669060', () => {
    expect(evaluateExpression('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toEqual(669060);
  })
  test('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 === 23340', () => {
    expect(evaluateExpression('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toEqual(23340);
  })
})

describe("18-02", () => {
  test.skip("test result", () => {
    expect(run("/testInput")).toEqual(null);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(145575710203332);
  });
});
