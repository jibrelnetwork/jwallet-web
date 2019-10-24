const fs = require('fs')
const path = require('path')
const ip = require('ip')

const { getBrowserStackCapabilitiesByConfig } = require('@jibrelnetwork/browserslist-config')

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
  capabilities: [],

  // Set a base URL in order to shorten url command calls. If your `url` parameter starts
  // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
  // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
  // gets prepended directly.
  baseUrl: `http://${TEST_SERVER_HOST}:${TEST_SERVER_PORT}`,

  onPrepare(config, capabilities) {
    return getBrowserStackCapabilitiesByConfig({
      browserStackUsername: process.env.BROWSERSTACK_USERNAME,
      browserStackPassword: process.env.BROWSERSTACK_ACCESS_KEY,
      browserslistConfigNames: [
        'recommended/mobile',
        'recommended/desktop',
      ],
    }).then((browserStackCapabilities) => {
      browserStackCapabilities
        .forEach((capability) => {
          // eslint-disable-next-line fp/no-mutating-methods
          capabilities.push(
            Object.assign({}, capability, {
              project: pkg.name, build: version,
            }),
          )
        })

      return true
    })
  },
}
