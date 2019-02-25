// @flow

function setAgreementValue(agreement: string, value: boolean) {
  try {
    localStorage.setItem(agreement, value.toString())
  } catch (e) {
    console.error(e)
  }
}

export default setAgreementValue
