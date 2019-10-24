const Page = require('./page.page')

class StartPage extends Page {
  open() {
    super.open('/wallets')
  }

  get createNewWalletButton() {
    return $(
      '#root > div > div > div > div:nth-child(1) > div > div.content > div.buttons > div > div.create'
    )
  }

  get importWalletButton() {
    return $(
      '#root > div > div > div > div:nth-child(1) > div > div.content > div.buttons > div > div.import'
    )
  }
}

module.exports = new StartPage()
