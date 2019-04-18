module.exports = class Page {
  constructor() {
    this.title = 'Test Page'
  }

  open(path) {
    browser.url(path)
  }
}