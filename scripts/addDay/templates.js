const getJSFileTemplate = () => `const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs.readFileSync(__dirname + '/' + inputFileName, 'utf8').split(os.EOL);
}

const process = (input) => {
  return;
}

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
}

module.exports = { run };
`;

const getTestFileTemplate = (
  taskNumber,
  subTaskNumber
) => `const { run } = require("./${subTaskNumber}");

describe.skip("${taskNumber}-${subTaskNumber}", () => {
  test("test result", () => {
    expect(run("/testInput")).toEqual(null);
  });
  test("solution result", () => {
    expect(run("/input")).toEqual(null);
  });
});
`;

module.exports = { getJSFileTemplate, getTestFileTemplate };
