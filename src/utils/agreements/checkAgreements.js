import getAgreements from './getAgreements'

export default function checkAgreements(nameConditionsArray) {
  const check = nameConditionsArray.map((key) => {
    if (getAgreements(key) === 'true') {
      return true
    }
    return false
  })

  if (nameConditionsArray.length === check.length) {
    return check.every(elem => elem === true)
  }
  return false
}

