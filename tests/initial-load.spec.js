/* global browser:false */

describe('Application works in specified browser', () => {
  it('starts', () => {
    browser
      .url('/wallets/start')

    expect(browser.isExisting('.wallets-view')).toBe(true)
  })
})
