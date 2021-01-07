const fs = require("fs");
const os = require("os");

const { diff, intersection } = require("./utils");

const parseInput = (inputFileName) => {
  return fs
    .readFileSync(__dirname + "/" + inputFileName, "utf8")
    .split(os.EOL)
    .map((line) => {
      const [, ingridientsStr, alergensStr] = line.match(
        /(.*)\s\(contains\s(.*)\)/
      );
      return {
        ingridients: new Set(ingridientsStr.split(" ")),
        alergens: new Set(alergensStr.split(", ")),
      };
    });
};

const getKnownAlergens = (food) => {
  const alergensToIngridients = new Map();
  for (let meal of food) {
    for (let alergen of meal.alergens) {
      if (alergensToIngridients.has(alergen)) {
        alergensToIngridients.set(
          alergen,
          intersection(alergensToIngridients.get(alergen), meal.ingridients)
        );
      } else {
        alergensToIngridients.set(alergen, meal.ingridients);
      }
    }
  }

  const knownAlergens = new Map();
  while (alergensToIngridients.size) {
    for (let [alergen, ingridients] of alergensToIngridients.entries()) {
      if (ingridients.size === 1) {
        knownAlergens.set(alergen, Array.from(ingridients)[0]);
        alergensToIngridients.delete(alergen);
        alergensToIngridients.forEach((ing, alg) => {
          alergensToIngridients.set(alg, diff(ing, ingridients));
        });
      }
    }
  }

  return knownAlergens;
};

const getCleanIngridients = (food, knownAlergens) => {
  const alergicIngridients = new Set(knownAlergens.values());

  const cleanIngridients = food.flatMap((meal) =>
    Array.from(diff(meal.ingridients, alergicIngridients))
  );

  return cleanIngridients;
};

const process = (input) => {
  const knownAlergens = getKnownAlergens(input);
  const knownAlergensArr = Array.from(
    knownAlergens.entries()
  ).sort(([alergenA], [alergenB]) => alergenA.localeCompare(alergenB));

  return knownAlergensArr.map(([, ingridient]) => ingridient).join(",");
};

const run = (inputFileName) => {
  const input = parseInput(inputFileName);
  return process(input);
};

run("input");

module.exports = { run };
