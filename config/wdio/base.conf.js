const fs = require('fs-extra')
const path = require('path')

const REPORT_OUTPUT_DIR = path.resolve(__dirname, '../../reports/functional-tests')
fs.mkdirpSync(path.resolve(REPORT_OUTPUT_DIR))

exports.REPORT_OUTPUT_DIR = REPORT_OUTPUT_DIR

exports.config = {
  specs: [
    './tests/**/*.spec.js',
  ],
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  outputDir: REPORT_OUTPUT_DIR,
  reporters: [
    'dot',
    ['junit', {
      outputDir: REPORT_OUTPUT_DIR,
    }],
  ],

  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: process.env.NODE_ENV === 'development' ? undefined : 30000,
  },
  sync: true,

  afterTest(test) {
    if (!test.passed && test.error) {
      console.log(test.error.message)
      console.log(test.error.stack)
    }
  },
}
