// importPage.js

const Page = require('./page.page')

class ImportPage extends Page {
  open() {
    super.open('/wallets')
  }

  get walletNameInput() {
    return $('input[name="Wallet name"]')
  }

  get nextStepButton() {
    return $('button[type=button]')
  }

  get interAddressField() {
    return $
  }

  get paymentPasswordField() {
    return $('input[name=password]')
  }
  get paymentPasswordConfirmationField() {
    return $('input[name=password-confirm]')
  }
  get paymentPasswordHint() {
    return $('input[name=password-hint]')
  }

  get createWalletButton(){
    return $('#root > div > div > div > div:nth-child(1) > div > div.content > div > form > div.actions > button')
  }

  get savedBackupButton(){
    return $('#root > div > div > div > div:nth-child(1) > div > div.content > div > form > div.actions > button')
  }
}

module.exports = new ImportPage()