const sortObject = require("sort-object-keys");
const { loadJSON, saveJSON } = require("./json");

const packageFilePath = `${process.argv[2]}/package.json`;
const json = loadJSON(packageFilePath);

// GENERAL
// -----------------------------------------------------------------------------
json.dependencies = {};
json.engines.node = ">=14";
json.scripts["prepare-release"] = "run-s reset-hard test version doc:html";

// COMMIT LINT
// -----------------------------------------------------------------------------
delete json.config;
delete json.devDependencies["cz-conventional-changelog"];

// DOCS
// -----------------------------------------------------------------------------
delete json.scripts["doc:publish"];
delete json.devDependencies["gh-pages"];

// JEST
// -----------------------------------------------------------------------------
json.scripts["test:unit"] = "jest --coverage";
json.scripts["watch:test"] = "jest --coverage --watch";
json.scripts.cov =
  "run-s build test:unit && open-cli reports/coverage/index.html";
delete json.ava;
delete json.nyc;
delete json.scripts["cov:html"];
delete json.scripts["cov:lcov"];
delete json.scripts["cov:send"];
delete json.scripts["cov:check"];
delete json.scripts["check-cli"];
delete json.scripts["check-integration-tests"];
delete json.scripts["diff-integration-tests"];
delete json.devDependencies["@ava/typescript"];
delete json.devDependencies["@istanbuljs/nyc-config-typescript"];
delete json.devDependencies["ava"];
delete json.devDependencies["codecov"];
delete json.devDependencies["nyc"];
json.devDependencies["@types/jest"] = "27.4.0";
json.devDependencies["eslint-plugin-jest"] = "26.1.1";
json.devDependencies["jest-config"] = "26.6.3";
json.devDependencies["jest-html-reporters"] = "2.1.6";
json.devDependencies["jest-junit"] = "12.2.0";
json.devDependencies["jest"] = "27.5.1";
json.devDependencies["ts-jest"] = "26.5.4";
json.devDependencies["ts-jest"] = "27.1.3";

// PRETTIER
// -----------------------------------------------------------------------------
delete json.prettier;
json.devDependencies["prettier"] = "2.5.1";

// DEV DEPENDENCIES
// -----------------------------------------------------------------------------
json.devDependencies["@types/node"] = "17.0.18";
json.devDependencies["husky"] = "7.0.4";
json.devDependencies["@commitlint/cli"] = "16.2.1";
json.devDependencies["@commitlint/config-conventional"] = "16.2.1";
json.devDependencies["jest-html-reporters"] = "3.0.5";
json.devDependencies["lint-staged"] = "12.3.4";
json.devDependencies["eslint-plugin-unused-imports"] = "2.0.0";
json.devDependencies = sortObject(json.devDependencies);

saveJSON(packageFilePath, json);
