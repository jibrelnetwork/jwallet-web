import getAgreements from './getAgreements'

export default function setAgreements(agreement) {
  try {
    if (getAgreements(agreement) === 'false') {
      localStorage.setItem(agreement, 'true')
    } else {
      localStorage.setItem(agreement, 'false')
    }
  } catch (e) {
    if (e === 'QUOTA_EXCEEDED_ERR') {
      console.error('Limit exceeded')
    }
  }
}
