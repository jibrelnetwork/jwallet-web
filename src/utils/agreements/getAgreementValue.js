// @flow

export default function getAgreementValue(agreement: string): boolean {
  return localStorage.getItem(agreement) === 'true'
}
