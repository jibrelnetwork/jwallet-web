// @flow

export default {
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
    size: 150,
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

  blockExplorerApiOptions: {
    method: 'GET',
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

  /**
   * blockexplorer url
   */
  blockExplorerLink: 'https://etherscan.io',

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

  /**
   * min count of transactions to dislay for user (initial sync)
   */
  minTransactionsCountToShow: 50,
}
