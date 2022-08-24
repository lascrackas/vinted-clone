const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|mjs?|ts?)$",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "jsx", "mjs"],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)


/* module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.mjs$": "babel-jest",
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}; */