const fs = require("fs");
const path = require("path");

const { getJSFileTemplate, getTestFileTemplate } = require("./templates");

const [, , taskNumber] = process.argv;

if (!taskNumber) {
  console.log("please specify folder name");
  process.exit(0);
}

const absoluteFolderPath = path.resolve(__dirname, "../../", taskNumber);

console.log(absoluteFolderPath);

if (fs.existsSync(absoluteFolderPath)) {
  console.log(`folder ${absoluteFolderPath} already exists`);
  process.exit(0);
}

const generateInputFiles = () => {
  fs.writeFileSync(absoluteFolderPath + "/input", "", {
    flag: "w",
  });
  fs.writeFileSync(absoluteFolderPath + "/testInput", "", {
    flag: "w",
  });
};

const gerateSubTaskJSFiles = (subTaskNumber) => {
  fs.writeFileSync(
    `${absoluteFolderPath}/${subTaskNumber}.js`,
    getJSFileTemplate(),
    {
      flag: "w",
    }
  );
  fs.writeFileSync(
    `${absoluteFolderPath}/${subTaskNumber}.test.js`,
    getTestFileTemplate(taskNumber, subTaskNumber),
    {
      flag: "w",
    }
  );
};

fs.mkdirSync(absoluteFolderPath);
generateInputFiles();
gerateSubTaskJSFiles("01");
gerateSubTaskJSFiles("02");
