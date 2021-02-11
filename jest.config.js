// @ts-check

/** @type import('@jest/types').Config.InitialOptions */
const SHARED_CONFIG = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
    },
  },
};

/** @type import('@jest/types').Config.InitialOptions */
module.exports = {
  projects: [
    // TODO: remove comment out after implementing `EventTarget` on Node.js
    // {
    //   ...SHARED_CONFIG,
    //   displayName: 'node',
    //   testEnvironment: 'node',
    // },
    {
      ...SHARED_CONFIG,
      displayName: 'browser',
      testEnvironment: 'jsdom',
    },
  ],
};
