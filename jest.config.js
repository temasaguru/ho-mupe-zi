const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/**
 * @see https://zenn.dev/miruoon_892/articles/e42e64fbb55137
 */
const customJestConfig = {
  globalSetup: '<rootDir>/jest.global-setup.ts',
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/adaptors/(.*)$': '<rootDir>/adaptors/$1',
    '^@/application/(.*)$': '<rootDir>/application/$1',
    '^@/domains/(.*)$': '<rootDir>/domains/$1',
    '^@/drivers/(.*)$': '<rootDir>/drivers/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
