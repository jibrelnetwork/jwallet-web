const loginTermsPage = require('../pageObject/loginTermsPage.page')
const startPage = require('../pageObject/startPage.page')

describe('Create or Import first wallet', () => {
  beforeAll(() => {
    //age.open()pen()
    loginTermsPage.open()
    loginTermsPage.checkboxes.forEach((checkbox) => {
      checkbox.$('label').click()
      loginTermsPage.confirmAndContinueButton.click();
    })
  })

  //Click to "Import wallet"
  it('Click to "Import wallet" button leads to the "/wallets/create" page', () =>{
    startPage.importWalletButton.click()
  })

})