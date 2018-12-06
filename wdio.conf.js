const fs = require('fs-extra')
const path = require('path')
const ip = require('ip')

if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
  throw new Error('You must specify both BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY')
}

const TEST_SERVER_HOST = process.env.TEST_SERVER_HOST || ip.address()
const TEST_SERVER_PORT = process.env.TEST_SERVER_PORT || 3000
const REPORT_OUTPUT_DIR = './reports/browserstack'
fs.mkdirpSync(path.resolve(REPORT_OUTPUT_DIR))

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  services: ['browserstack'],
  browserstackLocal: true,

  framework: 'jasmine',
  specs: [
    './tests/**/*.spec.js',
  ],
  suites: {
    smoke: [
      './tests/initial-load.spec.js',
    ],
  },

  maxInstances: 4,
  capabilities: [
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'Chrome',
    },
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'Firefox',
    },
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'Samsung',
    },
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'UC Browser',
    },
    {
      device: 'iPad 6th',
      real_mobile: true,
      browserName: 'Mobile Safari',
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Chrome',
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Firefox',
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Opera',
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Safari',
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Chrome',
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Edge',
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Firefox',
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'IE',
      browser_version: '11.0',
    },
  ],

  sync: true,

  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: true,

  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,

  // Saves a screenshot to a given path if a command fails.
  screenshotPath: './reports/browserstack/errors/',

  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: `http://${TEST_SERVER_HOST}:${TEST_SERVER_PORT}`,

  // Default timeout for all waitFor* commands.
  waitforTimeout: 10000,

  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  reporters: ['dot', 'junit'],
  reporterOptions: {
    junit: {
      outputDir: `${REPORT_OUTPUT_DIR}/`,
    },
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 10000,
  },

  before() {
    require('@babel/register')
  },
}
