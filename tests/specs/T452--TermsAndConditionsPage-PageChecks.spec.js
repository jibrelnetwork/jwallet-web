const loginTermsPage = require('../pageObject/loginTermsPage.page')
const startPage = require('../pageObject/startPage.page')

//LoginTermsPage(Agreements) are opened
describe('Initial app loading', () => {
  beforeAll(() => {
    loginTermsPage.open()
  })

  //URL check
  it('URL is correct', () => {
    expect(browser.getUrl()).toContain('/wallets')
  })

  //Title name
  it('Title name', () => {
    expect(browser.getTitle()).toBe('Jwallet by the Jibrel Network')
  })

  //Check the text on the page - 'Terms & Conditions' and text on checkboxes
  it('The text on the page matches with the layout', () => {
    expect(loginTermsPage.h1.getText()).toBe('Terms & Conditions')
    expect(loginTermsPage.checkboxes[0].getText()).toBe(
      'I understand that my funds are stored securely on my personal computer. ' +
        'No private data is sent to Jibrel AG servers. All encryption is done locally in browser'
    )
    expect(loginTermsPage.checkboxes[1].getText()).toBe(
      'I consent that the Jwallet service is provided as is without warranty. ' +
        'Jibrel AG does not have access to my private information and would not be able to assist in the resolution of issues concerning money loss of any kind'
    )
    expect(loginTermsPage.checkboxes[2].getText()).toBe(
      'I agree to allow cookies to collect anonymous usage data to improve the quality of the Jwallet'
    )
    expect(loginTermsPage.checkboxes[3].getText()).toBe(
      'I have read and accepted the Terms of Use and Privacy Policy'
    )
    expect(loginTermsPage.confirmAndContinueButton.getText()).toBe(
      'Confirm and continue'
    )
  })

  //Check that all checkboxes are clickable
  it('All checkboxes are clickable', () => {
    loginTermsPage.checkboxes.forEach((checkbox, idx) => {
      expect(
        checkbox.$('input[type=checkbox]').getAttribute('checked')
      ).toBeFalsy(`Checkbox #${idx} value is true`)
      checkbox.$('label').click()
      expect(
        checkbox.$('input[type=checkbox]').getAttribute('checked')
      ).toBeTruthy(`Checkbox #${idx} value is false`)
    })
  })

  //Check that "Terms of Use" and "Privacy Policy" links are clickable
  it('"Terms of Use" and "Privacy Policy" links are clickable', () => {
    const currentTabId = browser.getWindowHandles()[0]
    browser.pause(1000)
    loginTermsPage.termsOfUseLink.click()
    browser.switchWindow('jwallet.network/docs')
    browser.pause(1000)
    expect(browser.getUrl()).toBe(
      'https://jwallet.network/docs/JibrelAG-TermsofUse.pdf'
    )
    browser.closeWindow()
    browser.switchToWindow(currentTabId)
    browser.pause(1000)
    loginTermsPage.privacyPolicyLink.click()
    browser.switchWindow('jwallet.network/docs')
    browser.pause(1000)
    expect(browser.getUrl()).toBe(
      'https://jwallet.network/docs/JibrelAG-PrivacyPolicy.pdf'
    )
    browser.closeWindow()
    browser.switchToWindow(currentTabId)
    browser.pause(1000)
  })

  //'Confirm and continue' button is available after acceptance of all conditions and leads to /wallets page
  it('"Confirm and continue" button is available and leads to the next page', () => {
    loginTermsPage.confirmAndContinueButton.click()
    //expect(browser.getUrl()).toBe('/wallets') - will be ok after renaming of the page
    expect(startPage.createNewWalletButton.getAttribute('class')).toBe('create')
    expect(startPage.importWalletButton.getAttribute('class')).toBe('import')
    browser.pause(1000)
    //browser.debug()
  })
})
