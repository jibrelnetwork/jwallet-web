export default function setAgreementValue(agreement, value) {
  try {
    localStorage.setItem(agreement, value)
  } catch (e) {
    console.error(e)
  }
}
