module.exports = () => {
  browser.setLocalStorage('acceptTermsAndConditions', 'true')
  browser.setLocalStorage('consentNoWarranty', 'true')
  browser.setLocalStorage('consentTrackingCookies', 'true')
  browser.setLocalStorage('understandPrivateDataPolicy', 'true')
}
