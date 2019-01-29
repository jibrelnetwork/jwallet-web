export default function setAgreementValue(agreement, value) {
  try {
    localStorage.setItem(agreement, value)
  } catch (e) {
    if (e === 'QUOTA_EXCEEDED_ERR') {
      console.error('Limit exceeded')
    }
  }
}
