const loginTermsPage = require('../pageObject/loginTermsPage.page')
const startPage = require('../pageObject/startPage.page')
const createPage = require('../pageObject/createPage.page')

describe('Create or Import first wallet', () => {
  beforeAll(() => {
    loginTermsPage.open()
    loginTermsPage.checkboxes.forEach(checkbox => {
      checkbox.click()
      loginTermsPage.confirmAndContinueButton.click()
    })
  })

  //Click to "Create new wallet"
  it('Click to "Create new wallet" button leads to the "/wallets/create" page', () => {
    startPage.createNewWalletButton.click()
    //Page checks:
    //Check the URL
    expect(browser.getUrl()).toContain('/wallets/create')
    //Check the title
    expect(browser.getTitle()).toBe('Jwallet by the Jibrel Network')
    //Check name of the page
    expect($('div[class=title]').getText()).toBe('Create Wallet')
    //Check input with placeholder
    expect($('input[name="Wallet Name"]').getAttribute('placeholder')).toBe(
      'Wallet Name'
    )
    //Check the Next step button
    expect(createPage.nextStepButton.getText()).toContain('Next Step')
  })
})
