describe('Initial app loading', () => {
  it('redirects to agreements on first visit', () => {
    browser
      .url('/wallets/start')

    browser.waitUntil(() => {
      return $('.core-layout').isExisting()
    }, 5000, 'expected page to initialize after 5s')

    expect(browser.getUrl()).toContain('agreements')
  })
})
