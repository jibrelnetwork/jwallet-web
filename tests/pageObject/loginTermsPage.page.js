const Page = require('./page.page')

class LoginTermsPage extends Page {
  open() {
    super.open('/wallets')
  }
  get h1() {
    return $('h1')
  }

  get checkboxes() {
    return [
      $(
        '#root > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(1) label'
      ),
      $(
        '#root > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(2) label'
      ),
      $(
        '#root > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(3) label'
      ),
      $(
        '#root > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(4) label'
      ),
    ]
  }

  get termsOfUseLink() {
    return $(
      '#root > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(4) > div > label > a:nth-child(5)'
    )
  }

  get privacyPolicyLink() {
    return $(
      '#root > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div:nth-child(4) > div > label > a:nth-child(7)'
    )
  }

  get confirmAndContinueButton() {
    return $(
      '#root > div > div > div > div:nth-child(1) > div > div > div._17RbzQLX'
    )
  }
}
module.exports = new LoginTermsPage()
