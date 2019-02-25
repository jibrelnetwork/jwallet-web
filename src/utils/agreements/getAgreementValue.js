// @flow

function getAgreementValue(agreement: string): boolean {
  return localStorage.getItem(agreement) === 'true'
}

export default getAgreementValue
