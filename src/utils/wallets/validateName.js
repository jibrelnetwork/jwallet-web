// @flow strict

import { t } from 'ttag'

const RE_INVALID_NAME: RegExp = /[/]/

export function validateName(name: ?string): ?string {
  const trimmedName: string = (name || '').trim()

  if (!trimmedName) {
    return t`Name should not be empty`
  } else if (trimmedName.length > 32) {
    return t`Length of name should not be greater than 32 symbols`
  }

  const hasInvalidSymbols: boolean = RE_INVALID_NAME.test(trimmedName)

  if (hasInvalidSymbols) {
    return t`Name should not include invalid symbols`
  }

  return null
}
