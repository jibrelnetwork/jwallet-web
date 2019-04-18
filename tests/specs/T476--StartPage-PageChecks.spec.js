const loginTermsPage = require('../pageObject/loginTermsPage.page')
const startPage = require('../pageObject/startPage.page')

describe('Create or Import first wallet', () => {
  beforeAll(() => {
    loginTermsPage.open()
    loginTermsPage.checkboxes.forEach((checkbox) => {
        checkbox.$('label').click()
    loginTermsPage.confirmAndContinueButton.click();
      })
    })

  //URL check
  it('URL is correct', () => {
    expect(browser.getUrl()).toContain('/wallets')
  })

  // Title name
  it('Title name', () => {
    expect(browser.getTitle()).toBe('Jwallet by the Jibrel Network')
  })

  //find Element "Create wallet" and check the text
  it('The text on the page matches with the layout', () => {
    expect(startPage.createNewWalletButton.getText()).toContain('Create new wallet')
    expect(startPage.createNewWalletButton.getText()).toContain('Create your own wallet to manage your digital assets')
   })

  //find Element "Import wallet" and check the text
  it('The text on the page matches with the layout', () => {
    expect(startPage.importWalletButton.getText()).toContain('Import Wallet')
    expect(startPage.importWalletButton.getText()).toContain('Import an existing wallet to manage your digital assets')
    browser.pause(1000)
  })
})