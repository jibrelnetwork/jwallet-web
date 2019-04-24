// @flow

function getIntroductionValue(): boolean {
  return localStorage.getItem('introductionAccepted') === 'true'
}

export default getIntroductionValue
