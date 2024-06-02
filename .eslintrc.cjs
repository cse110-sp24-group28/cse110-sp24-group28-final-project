module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: ["{.eslintrc.{js,cjs},src/unitTests/*.js}"],
      parserOptions: {
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // Setting the no-unused-vars rule to warn globally
    "no-unused-vars": "warn",
    // Optionally, ignore variables that start with an underscore
    // "no-unused-vars": ["warn", { "varsIgnorePattern": "^_" }]
  },
};
