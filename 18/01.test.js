const { run, infixToRPN, evaluateExpression } = require("./01");

describe("infixToRPN", () => {
  test("3+4 should be 34+", () => {
    expect(infixToRPN("3+4")).toEqual("34+");
  });
  test("5+(3+4) should be 34+", () => {
    expect(infixToRPN("5 + (3 + 4)")).toEqual("534++");
  });
  test("6*5+(3+4) should be 34+", () => {
    expect(infixToRPN("6 * 5 + (3 + 4)")).toEqual("65*34++");
  });
});

describe('evaluateExpressions', () => {
  test('1 + 2 * 3 + 4 * 5 + 6 === 71', () => {
    expect(evaluateExpression('1 + 2 * 3 + 4 * 5 + 6')).toEqual(71);
  })
  test('1 + (2 * 3) + (4 * (5 + 6)) === 51', () => {
    expect(evaluateExpression('1 + (2 * 3) + (4 * (5 + 6))')).toEqual(51);
  })
  test('2 * 3 + (4 * 5) === 26', () => {
    expect(evaluateExpression('2 * 3 + (4 * 5)')).toEqual(26);
  })
  test('5 + (8 * 3 + 9 + 3 * 4 * 3) === 437', () => {
    expect(evaluateExpression('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toEqual(437);
  })
  test('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) === 12240', () => {
    expect(evaluateExpression('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toEqual(12240);
  })
  test('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 === 13632', () => {
    expect(evaluateExpression('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toEqual(13632);
  })
})

describe("18-01", () => {
  test.skip("test result", () => {
    expect(run("/testInput")).toEqual(null);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(8298263963837);
  });
});
