// @flow

export function checkAgreements(nameConditionsArray: string[], agreements: Object) {
  return nameConditionsArray.every(key => agreements[key])
}
