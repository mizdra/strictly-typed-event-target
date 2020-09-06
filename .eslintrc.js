// @ts-check
/* eslint-env node */

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: ['@mizdra/mizdra', '@mizdra/mizdra/+typescript', '@mizdra/mizdra/+prettier'],
  parserOptions: {
    project: ['./tsconfig.src.json', './tsconfig.test.json', './tsconfig.test-type.json'],
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {},
};
