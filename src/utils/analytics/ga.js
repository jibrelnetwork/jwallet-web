// We pass parameters directly to external library function, so:
// eslint-disable-next-line fp/no-rest-parameters
export const ga = (...args) => {
  // FIXME: local storage parameter requires proper naming and documentation
  if (localStorage.getItem('CONSENT_USAGE_ANALYTICS') === 'true') {
    window.ga(...args)
  }
}
