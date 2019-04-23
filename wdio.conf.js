// available values:
// 'development' - for local test development, runs local Google Chrome
// 'ci' - for running tests on Jenkins
// 'devserver' - for running tests on development server
// 'stageserver' - for running tests on staging server
// 'production' - for running tests in production
const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_DEVELOPMENT = NODE_ENV === 'development'

if (['development', 'production'].indexOf(NODE_ENV) === -1) {
  // eslint-disable-next-line fp/no-mutation
  process.env.BABEL_ENV = 'test'
}

if (!IS_DEVELOPMENT) {
  if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
    throw new Error('You must specify both BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY')
  }
}

const base = require('./config/wdio/base.conf')
const browserstack = require('./config/wdio/browserstack.conf')
const chromedriver = require('./config/wdio/chromedriver.conf')

exports.config = Object.assign(
  {
    suites: {
      smoke: [
        './tests/specs/t433--TermsAndConditionsPage-AcceptAndContinue.spec.js',
        './tests/specs/T452--TermsAndConditionsPage-PageChecks.spec.js',
        './tests/specs/T453--CreateWallet-PageChecks-MainPage.spec.js',
        './tests/specs/T455--CreateWallet-PageChecks-SetSecurityPassword.spec.js',
        './tests/specs/T457--ImportWallet-PageChecks.spec.js',
        './tests/specs/T476--StartPage-PageChecks.spec.js',
      ],
      regression: [],
    },
  },
  base.config,
  IS_DEVELOPMENT ? chromedriver.config : browserstack.config,
)
