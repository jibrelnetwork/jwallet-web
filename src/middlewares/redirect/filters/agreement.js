import { checkAgreements } from 'utils/agreements'
import { CONDITIONS_LIST } from 'data/agreements'

export const agreement = (state, pathname) => {
  const isAgreementsPathname = /^\/agreements\/?$/.test(pathname)
  const isAllAgreementsChecked = checkAgreements(CONDITIONS_LIST)
  if (isAgreementsPathname && isAllAgreementsChecked) {
    return '/wallets'
  }
  if (!isAgreementsPathname && !isAllAgreementsChecked) {
    return '/agreements'
  }

  return pathname
}
