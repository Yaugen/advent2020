const fs = require("fs");
const os = require("os");

const parseInput = (inputFileName) => {
  return fs.readFileSync(__dirname + "/" + inputFileName, "utf8").split(os.EOL);
};

const precendence = {
  '+': 2,
  '*': 1,
}
// RPN - reverse polish notation
const infixToRPN = (input) => {
  const exprArr = input.replace(/\s/g, "").split("");
  const opStack = [];
  const output = [];
  for (let char of exprArr) {
    const isNumber = !Number.isNaN(Number(char));
    if (isNumber) {
      output.push(char);
    } else if (char === "+" || char === "*") {
      while(opStack.length && opStack[opStack.length-1]!=='(') {
        const isEmpty = !opStack.length;
        const top = opStack[opStack.length-1];
        if (isEmpty || top === '(' || precendence[top]<precendence[char]) {
          break;
        }
        output.push(opStack.pop())
      }
      opStack.push(char)
    } else if (char === '(') {
      opStack.push(char);
    } else if (char === ')') {
      while(opStack.length && opStack[opStack.length-1]!=='(') {
        output.push(opStack.pop())
      }
      opStack.pop();
    }
  }
  while(opStack.length) {
    output.push(opStack.pop());
  }

  return output.join("");
};

const ops = {
  '+': (a,b) => a+b,
  '*': (a,b) => a*b
}

const evaluateRPN = (rpnExpr) => {
  const rpn = rpnExpr.split('');
  const stack = [];
  for(let char of rpn) {
    if (char === '+' || char === '*') {
      const a = stack.pop();
      const b = stack.pop();
      stack.push(ops[char](a,b));
    } else {
      stack.push(Number(char))
    }
  }

  return stack.pop();
}

const evaluateExpression = (expr) => {
  const rpn = infixToRPN(expr);
  return evaluateRPN(rpn);
}

const process = (input) => {
  return input.reduce((sum, expr) => sum+evaluateExpression(expr), 0);
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

module.exports = { run, infixToRPN, evaluateExpression };
