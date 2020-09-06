// @ts-check
/* eslint-env node */

/** @type import('eslint').Linter.BaseConfig */
module.exports = {
  root: true,
  extends: [
    '@mizdra/mizdra',
    '@mizdra/mizdra/+typescript',
    '@mizdra/mizdra/+prettier',
  ],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  rules: {},
};
