// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  modulePaths: ["src"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$",
  testPathIgnorePatterns: ["\\.snap$", "\\.sass$", "<rootDir>/node_modules/"],

  globals: {
    "ts-jest": {
      babel: true,
      tsconfig: "tsconfig.json",
    },
  },
};
