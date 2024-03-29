/**
 * For a detailed explanation regarding each configuration property, visit:

*/

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/__tests__/setupFile.js']
};

export default config;
