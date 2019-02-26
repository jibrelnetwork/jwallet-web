// @flow

import { checkAgreements } from 'utils/agreements'
import { CONDITIONS_LIST } from 'data/agreements'

export const agreement = (state: AppState, pathname: string): string => {
  const isAgreementsPathname = /^\/agreements\/?$/.test(pathname)
  const isAllAgreementsChecked = checkAgreements(CONDITIONS_LIST)

  if (isAgreementsPathname && isAllAgreementsChecked) {
    return '/'
  }

  if (!isAgreementsPathname && !isAllAgreementsChecked) {
    return '/agreements'
  }

  return pathname
}
