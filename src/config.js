// @flow

const ONE_SECOND: number = 1000
const ONE_MINUTE: number = 60 * ONE_SECOND
const ONE_HOUR: number = 60 * ONE_MINUTE
const ONE_DAY: number = 24 * ONE_HOUR

const ONE_KB: number = 1024
const ONE_MB: number = 1024 * ONE_KB

const config: AppConfig = {
  // timeout for search input field (to prevent searching on each entered symbol)
  searchTimeout: 250,

  // timeout for resetting of pincode incorrect state
  resetIncorrectPincodeTimeout: 1000,

  // timeout before opening/closing modal animation
  modalOpeningClosingTimeout: 400,

  // To prevent closing on first open of popover
  popoverClickTimeout: 50,

  // timeout before opening/closing popover animation
  popoverOpeningClosingTimeout: 300,

  // Default Appearable timeout
  defaultAppearableTimeout: 300,

  // Tablet/Mobile window width
  mobileWidth: 1024,

  // Total number of accounts while loading
  accountsLoadingCount: 3,

  // timeout for resetting of shaking popover state
  popoverShakeTimeout: 1000,

  // default QRCode appearance
  qrCodeDefaultAppearance: {
    size: 240,
    errorCorrectionLevel: 'high',
    color: {
      light: '#ffcc00ff',
      dark: '#001111ff',
    },
  },

  /**
   * URL/IP regex, that includes localhost and port checking
   * to check - https://regexr.com/3grae - set of valid/invalid examples
   */
  urlRe: /^(((https?:\/\/)|(www\.))((([A-Z\d_-]+\.)+)([A-Z\d_-]+)|(localhost))((:\d{2,4})?))$/i,

  // modal shake timeout
  modalShakeTimeout: 1000,

  // addresses count to get from mnemonic per one iteration
  addressesPerIteration: 4,

  // get balances interval timeout
  getBalancesIntervalTimeout: 50000,

  // get transactions interval timeout
  getTransactionsIntervalTimeout: 60000,

  // defaultDecimals
  defaultDecimals: 18,

  // json-format config
  jsonFormat: {
    type: 'space',
    size: 2,
  },

  blockExplorerAPIOptions: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  },

  tickerAPIOptions: {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'default',
  },

  // max password length
  maxPasswordLength: 40,

  // delay before form will be cleaned
  delayBeforeFormClean: 1000,

  // defaul derivation path for mnemonic
  defaultDerivationPath: 'm/44\'/60\'/0\'/0',

  /**
   * minimum balance loading timeout (ms)
   * to prevent blinking of loader for fast response
   */
  balanceLoadingTimeout: 300,

  /**
   * timeout for showing a message, that some content was copied to buffer (ms)
   */
  copyToBufferTimeout: 5 * 1000,

  /**
   * timeout for waiting of current wallet ID initialisation
   */
  walletIdInitTimeout: 100,

  blockExplorerUILink: 'etherscan.io',

  /**
   * supported languages
   */
  supportedLanguages: ['en', 'ko', 'zh', 'ja'],

  /**
   * number of addresses derived from bip32 extended public key
   */
  mnemonicAddressesCount: 4,

  /**
   * landing page url
   */
  landingURL: 'https://jwallet.network',

  /**
   * timeout before confirming of delete wallet action
   */
  deleteConfirmTimeout: 30,

  latestBlockSyncTimeout: 30 * ONE_SECOND,

  currentBlockSyncTimeout: 5 * ONE_SECOND,

  processingBlockWaitTimeout: 1 * ONE_SECOND,

  syncTransactionsTimeout: 10 * ONE_SECOND,

  maxBlocksPerTransactionsRequest: 500 * 1000,

  minBlocksPerTransactionsRequest: 1000,

  blockExplorerMaxResponseSize: 0.5 * ONE_MB,

  requestQueueWorkersCount: 4,

  resyncTransactionsTimeout: 5 * ONE_MINUTE,

  syncBalancesTimeout: 10 * ONE_SECOND,

  miningDelay: ONE_DAY,

  addressWalletType: 'address',

  mnemonicWalletType: 'mnemonic',

  encryptedDataLength: 120,

  defaultSaltBytesCount: 32,

  defaultScryptParams: {
    /**
     * 2 ** 18 - complexity like geth
     * 2 ** 14 - recommended Scrypt complexity
     */
    N: __DEV__ ? 2 ** 14 : 2 ** 18,
    r: 8,
    p: 1,
  },

  defaultEncryptionType: 'nacl.secretbox',

  defaultDerivationKeyLength: 32,

  defaultRandomBufferLength: 32,

  fiatCoursesSyncTimeout: ONE_MINUTE,
}

export default config
