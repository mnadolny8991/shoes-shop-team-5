import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/types/**',
    '!src/testing/**',
    '!src/styles/**',
    '!src/mock/**',
    '!src/lib/api/**',
    '!src/data/**',
    '!src/svgIcons/**',
    '!src/app/**',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  testEnvironment: 'jsdom',
  globals: {
    fetch: globalThis.fetch,
  },
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);