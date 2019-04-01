module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      lines: 0,
      branches: 0,
      functions: 0,
      statements: 0,
    },
  },
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageReporters: [
    'lcov',
    'html',
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.{js,jsx}',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!lodash-es).+\\.(js|jsx)$',
  ],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^lodash-es$': 'lodash',
  },
  setupFiles: [
    'react-app-polyfill/jsdom',
  ],
  setupFilesAfterEnv: [
    'jest-enzyme',
  ],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  globals: {
    __DEV__: true,
  },
}
