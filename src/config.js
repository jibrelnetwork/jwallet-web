export default {
  // timeout for search input field (to prevent searching on each entered symbol)
  searchTimeout: 400,

  // timeout for resetting of pincode incorrect state
  resetIncorrectPincodeTimeout: 1000,

  // timeout before opening/closing modal animation
  modalOpeningClosingTimeout: 300,

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

  // default QRCode appearance
  qrCodeDefaultAppearance: {
    size: 150,
    errorCorrectionLevel: 'high',
    color: {
      light: '#ffcc00ff',
      dark: '#001111ff',
    },
  },
}
