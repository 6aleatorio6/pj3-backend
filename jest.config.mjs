/**
 * For a detailed explanation regarding each configuration property, visit:

*/

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {},
  rootDir: './',
  testPathIgnorePatterns: ['<rootDir>/__tests__/setupFile.js'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupFile.js'],
  verbose: true,
  forceExit: true,
  bail: 1
};

export default config;
