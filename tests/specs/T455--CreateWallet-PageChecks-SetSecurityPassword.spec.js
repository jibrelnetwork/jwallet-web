const loginTermsPage = require('../pageObject/loginTermsPage.page')
const startPage = require('../pageObject/startPage.page')
const createPage = require('../pageObject/createPage.page')

describe('Create or Import first wallet', () => {
  beforeAll('Open Login Terms page, accept all conditions, click to create New Wallet', () => {
    loginTermsPage.open()
    loginTermsPage.checkboxes.forEach((checkbox) => {
      checkbox.click()
    })
    loginTermsPage.confirmAndContinueButton.click();
    startPage.createNewWalletButton.click()
  })

  it('Enter the name of the new wallet, click to the "Next Step" button and proceed to Create page', () => {
    $('input[name="Wallet Name"]').setValue('test123')
    createPage.nextStepButton.click()
  })

  it('"Set Payment Password" page checks', () => {
    // Check the URL
    expect(browser.getUrl()).toContain('/wallets/create')
    // Check the title
    expect(browser.getTitle()).toBe('Jwallet by the Jibrel Network')
    // Check name of the page
    expect($('div[class=title]').getText()).toBe('Create Wallet')
    //Check 'Payment Password' input with placeholder
    expect($('input[name="password"]').getAttribute('placeholder')).toBe('Payment Password')
    //Check 'Confirm Payment Password' input with placeholder
    expect($('input[name="password-confirm"]').getAttribute('placeholder')).toBe('Confirm Payment Password')
    //Check 'Password hint' input with placeholder
    expect($('input[name="password-hint"]').getAttribute('placeholder')).toBe('Password hint')
    //Check the 'Create Wallet' button
    expect((createPage.createWalletButton).getText()).toContain('Create Wallet')
  })
})