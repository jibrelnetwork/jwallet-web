const Page = require('./page.page')

class CreatePage extends Page {
  open() {
    super.open('/wallets')
  }

  get walletNameInput() {
    return $('input[name="Wallet name"]')
  }

  get nextStepButton() {
    return $('button[type=button]')
    //#root > div > div > div > div:nth-child(1) > div > div.content > div > form > div.actions > button
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

  get createWalletButton() {
    return $(
      '#root > div > div > div > div:nth-child(1) > div > div.content > div > form > div.actions > button'
    )
  }

  get walletViewTitle() {
    return $('div[class=wallet-view-title]')
  }

  get titleAndBackupDelimiter() {
    // FIXME: get delimiter from title
    // return $('div[class=wallet-view-title::before]')
  }

  get backupPhraseContainer() {
    return $('div[class=copyable-field]')
  }

  get savedBackupButton() {
    return $(
      '#root > div > div > div > div:nth-child(1) > div > div.content > div > form > div.actions > button'
    )
  }
}

module.exports = new CreatePage()
