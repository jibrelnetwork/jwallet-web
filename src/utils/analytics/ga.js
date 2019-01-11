const REPORT_ONCE = {
  GOOGLE_ANALYTICS_UNAVAILABLE: false,
}

// We pass parameters directly to external library function, so:
// eslint-disable-next-line fp/no-rest-parameters
export const ga = (...args) => {
  // FIXME: local storage parameter requires proper naming and documentation
  if (localStorage.getItem('CONSENT_USAGE_ANALYTICS') === 'true') {
    try {
      window.ga(...args)
    } catch (err) {
      if (!REPORT_ONCE.GOOGLE_ANALYTICS_UNAVAILABLE) {
        // eslint-disable-next-line fp/no-mutation
        REPORT_ONCE.GOOGLE_ANALYTICS_UNAVAILABLE = true
        // eslint-disable-next-line no-console
        console.warn('Google Analytics is not available')
      }
    }
  }
}
