// We pass parameters directly to external library function, so:
// eslint-disable-next-line fp/no-rest-parameters
export const ga = (...args) => {
  // FIXME: local storage parameter requires proper naming and documentation
  if (localStorage.getItem('usageAnalyticsConsent') === 'true') {
    window.ga(...args)
  }
}
