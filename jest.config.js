// @ts-check

/** @type import('@jest/types').Config.InitialOptions */
const SHARED_CONFIG = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};

/** @type import('@jest/types').Config.InitialOptions */
module.exports = {
  projects: [
    {
      ...SHARED_CONFIG,
      displayName: 'node',
      testEnvironment: 'node',
    },
    {
      ...SHARED_CONFIG,
      displayName: 'browser',
      testEnvironment: 'jsdom',
    },
  ],
};
