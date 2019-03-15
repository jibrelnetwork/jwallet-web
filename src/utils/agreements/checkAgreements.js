// @flow

import getAgreementValue from './getAgreementValue'

function checkAgreements(nameConditionsArray: string[]) {
  return nameConditionsArray.every(key => getAgreementValue(key))
}

export default checkAgreements
