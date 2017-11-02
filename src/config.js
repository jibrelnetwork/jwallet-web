export default {
  // timeout for search input field (to prevent searching on each entered symbol)
  searchTimeout: 400,

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

  // currencies get balance interval timeout
  getBalanceIntervalTimeout: 60000,

  // defaultDecimals
  defaultDecimals: 18,

  // json-format config
  jsonFormat: {
    type: 'space',
    size: 2,
  },
}
