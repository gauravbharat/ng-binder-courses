module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@ngrx/recommended-requiring-type-checking",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [".eslintrc.js"],
  plugins: ["@typescript-eslint"],
  rules: {},
};
