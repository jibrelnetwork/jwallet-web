import getAgreementValue from './getAgreementValue'

export default function checkAgreements(nameConditionsArray) {
  return nameConditionsArray.every(key => getAgreementValue(key))
}

