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
  moduleDirectories: ['<rootDir>', 'src', 'node_modules'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^lodash-es$': 'lodash',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '<rootDir>/reports/unit-tests',
      },
    ],
  ],
  setupFiles: [
    'react-app-polyfill/jsdom',
    '<rootDir>/.jest/register-context.js',
  ],
  setupFilesAfterEnv: [
    'jest-enzyme',
  ],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  globals: {
    __DEV__: false,
    __DEFAULT_BLOCKEXPLORER_API__: '',
  },
}
