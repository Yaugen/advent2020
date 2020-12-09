const fs = require("fs");
const os = require("os");

const parseInput = () => {
  return fs
    .readFileSync("./input", "utf8")
    .split(os.EOL)
    .map((line) => {
      const [op, argStr] = line.split(" ");
      return {
        op,
        arg: Number(argStr),
      };
    });
};

const execute = (commands) => {
  let currLine = 0;
  let accumulator = 0;
  const executedLines = new Set();

  while (currLine < commands.length) {
    if (executedLines.has(currLine)) {
      return { exitCode: "LOOP", acc: accumulator };
    }

    const { op, arg } = commands[currLine];
    executedLines.add(currLine);

    if (op === "acc") {
      accumulator += arg;
      currLine += 1;
    } else if (op === "jmp") {
      currLine += arg;
    } else if (op === "nop") {
      currLine += 1;
    }
  }

  return { exitCode: "DONE", acc: accumulator };
};

const switchOp = (cmdData) => {
  cmdData.op = cmdData.op === "jmp" ? "nop" : "jmp";
};

const run = () => {
  const commands = parseInput();
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].op === "jmp" || commands[i].op === "nop") {
      switchOp(commands[i]);
      const result = execute(commands);
      if (result.exitCode === "DONE") {
        console.log(result.acc);
        return;
      }
      switchOp(commands[i]);
    }
  }
};

run();
