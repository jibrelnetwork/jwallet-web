const fs = require('fs')
const path = require('path')
const ip = require('ip')

const TEST_SERVER_HOST = process.env.TEST_SERVER_HOST || ip.address()
const TEST_SERVER_PORT = process.env.TEST_SERVER_PORT || 3000

const pkg = require('../../package.json')

const version = fs.readFileSync(
  path.resolve(__dirname, '../../version.txt'),
  'utf8',
)

exports.config = {
  services: [
    'browserstack',
  ],

  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  browserstackLocal: true,
  browserstackOpts: {
    enableLoggingForApi: true,
  },
  maxInstances: 4,
  capabilities: [
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'Chrome',
      project: pkg.name,
      build: version,
    },
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'Firefox',
      project: pkg.name,
      build: version,
    },
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'Samsung',
      project: pkg.name,
      build: version,
    },
    {
      device: 'Samsung Galaxy Tab S3',
      real_mobile: true,
      os_version: '7.0',
      browserName: 'UC Browser',
      project: pkg.name,
      build: version,
    },
    {
      device: 'iPad 6th',
      real_mobile: true,
      browserName: 'Mobile Safari',
      project: pkg.name,
      build: version,
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Chrome',
      project: pkg.name,
      build: version,
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Firefox',
      project: pkg.name,
      build: version,
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Opera',
      project: pkg.name,
      build: version,
    },
    {
      os: 'OS X',
      os_version: 'Mojave',
      browserName: 'Safari',
      project: pkg.name,
      build: version,
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Chrome',
      project: pkg.name,
      build: version,
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Edge',
      project: pkg.name,
      build: version,
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'Firefox',
      project: pkg.name,
      build: version,
    },
    {
      os: 'Windows',
      os_version: '10',
      browserName: 'IE',
      browser_version: '11.0',
      project: pkg.name,
      build: version,
    },
  ],

  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: `http://${TEST_SERVER_HOST}:${TEST_SERVER_PORT}`,
}
