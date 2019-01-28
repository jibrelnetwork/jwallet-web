const agreements = {}

/* eslint-disable fp/no-mutation */
export const getAgreements = () => JSON.parse(localStorage.getItem('agreements'))

if (getAgreements()) {
  Object.keys(getAgreements()).forEach((key) => {
    agreements[key] = getAgreements()[key]
  })
} else {
  agreements['condition-0'] = false
  localStorage.setItem('agreements', JSON.stringify(agreements))
}

export const checkAgreements = (nameConditionsArray) => {
  if (Object.keys(getAgreements()).length === nameConditionsArray.length) {
    const check = nameConditionsArray.map((key) => {
      if (!getAgreements()[key]) {
        return false
      }
      return true
    })
    return check.every(elem => elem === true)
  }
  return false
}

export const setAgreements = (agreement) => {
  try {
    if (getAgreements()[agreement]) {
      agreements[agreement] = false
      localStorage.setItem('agreements', JSON.stringify(agreements))
    } else {
      agreements[agreement] = true
      localStorage.setItem('agreements', JSON.stringify(agreements))
    }
  } catch (e) {
    if (e === 'QUOTA_EXCEEDED_ERR') {
      console.error('Limit exceeded')
    }
  }
}
/* eslint-enable fp/no-mutation */
