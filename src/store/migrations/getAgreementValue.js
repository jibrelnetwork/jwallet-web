// @flow strict

export function getAgreementValue(agreement: string): boolean {
  try {
    return localStorage.getItem(agreement) === 'true'
  } catch (error) {
    return false
  }
}
