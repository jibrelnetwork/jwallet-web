const loginTermsPage = require('../pageObject/loginTermsPage.page')

// LoginTermsPage(Agreements) are opened
describe('Initial app loading', () => {
  beforeAll(() => {
    loginTermsPage.open()
  })

  // '"Confirm and continue" button is available and leads to the next page'
  // Step 1. Click to 'Continue' -> 'Continue' is disabled
  it('Click to "Continue" -> "Continue" is disabled', () => {
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
  })

  // Step 2. Check all the checkboxes one by one and click 'to Continue' -> 'Continue' is disabled
  it('Check(and uncheck) all the checkboxes one by one', () => {
    // Click to 1st checkbox, check disabled, click once again, check disabled again
    loginTermsPage.checkboxes[0].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()

    // Click to 2nd checkbox, check disabled, click once again, check disabled again
    loginTermsPage.checkboxes[1].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[1].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')

    // Click to 3rd checkbox, check disabled, click once again, check disabled again
    loginTermsPage.checkboxes[2].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[2].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')

    // Click to 4th checkbox, check disabled, click once again, check disabled again
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
  })

  //Step 3. Check  any 2 checkboxes(for example - 1, 2, 4) and try to click -> 'Continue' is disabled
  it('Check  any 2 checkboxes', () => {
    //Click to 1st and 2nd checkboxes, check disabled, click once again, check disabled again
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[1].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[1].click()

    //Click to 1st and 3nd checkboxes
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[2].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[2].click()

    //Click to 1st and 4th checkboxes
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[3].click()

    //Click to 2st and 3th checkboxes
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[2].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[2].click()

    //Click to 2st and 4th checkboxes
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[3].click()

    //Click to 3rd and 4th checkboxes
    loginTermsPage.checkboxes[2].click()
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[2].click()
    loginTermsPage.checkboxes[3].click()
  })

  //3. Check  any 3 checkboxes and try to proceed -> 'Continue' is disabled
  it('Check  any 2 checkboxes', () => {
    // Check 1, 2, 3 checkboxes -> 'Continue' is disabled
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[2].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[2].click()

    // Check 1, 2, 4 checkboxes -> 'Continue' is disabled
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[3].click()

    // Check 1, 3, 4 checkboxes -> 'Continue' is disabled
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[2].click()
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()
    loginTermsPage.checkboxes[2].click()
    loginTermsPage.checkboxes[3].click()

    // Check 2, 3, 4 checkboxes -> 'Continue' is disabled
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[2].click()
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[1].click()
    loginTermsPage.checkboxes[2].click()
    loginTermsPage.checkboxes[3].click()
  })

  // 4. Check 1, 2, 3, 4, then uncheck one of them, than try to continue
  it('check marking of all checkboxes and unmarked one', () => {
    // check all - button enabled
    loginTermsPage.checkboxes.forEach((checkbox, idx) => {
      checkbox.click()
      if (idx !== loginTermsPage.checkboxes.length - 1) {
        expect(
          loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
        ).toBe('true')
      }
    })
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe(null)

    // Uncheck 1st checkbox - button disabled
    loginTermsPage.checkboxes[0].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[0].click()

    // Uncheck 2nd checkbox - button disabled
    loginTermsPage.checkboxes[1].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[1].click()

    // Uncheck 3rd checkbox - button disabled
    loginTermsPage.checkboxes[2].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[2].click()

    // Uncheck 4th checkbox - button disabled
    loginTermsPage.checkboxes[3].click()
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe('true')
    loginTermsPage.checkboxes[3].click()
  })

  // 5. Check 1, 2, 3, 4 checboxes and click 'to Continue' -> Setting Security Password page opens
  it('Check all checkboxes and continue', () => {
    expect(
      loginTermsPage.confirmAndContinueButton.getAttribute('disabled')
    ).toBe(null)
    loginTermsPage.confirmAndContinueButton.click()
  })
})
