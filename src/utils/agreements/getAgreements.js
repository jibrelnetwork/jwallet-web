export default function getAgreements(agreement) {
  return localStorage.getItem(agreement) === null ? 'false' : localStorage.getItem(agreement)
}
