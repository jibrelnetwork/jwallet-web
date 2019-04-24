// @flow

function setIntroductionValue() {
  try {
    localStorage.setItem('introductionAccepted', 'true')
  } catch (e) {
    console.error(e)
  }
}

export default setIntroductionValue
