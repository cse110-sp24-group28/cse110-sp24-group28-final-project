module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // This should generally cover Jest globals
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        ".eslintrc.{js,cjs}", // Adjust as needed
        "src/tests/*.js",
        "jest-puppeteer.config.js", // Explicitly including this
      ],
      parserOptions: {
        sourceType: "script",
      },
      globals: {
        page: "readonly", // Declare page as a global if necessary
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
