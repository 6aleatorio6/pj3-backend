/**
 * For a detailed explanation regarding each configuration property, visit:

*/

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {},
  testPathIgnorePatterns: ['<rootDir>/__tests__/setupFile.js'],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupFile.js'],
  verbose: true,
  forceExit: true
};

export default config;
