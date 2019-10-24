// @flow strict

import { i18n } from 'i18n/lingui'

const RE_INVALID_NAME: RegExp = /[/]/

export function validateName(name: ?string): ?string {
  const trimmedName: string = (name || '').trim()

  if (!trimmedName) {
    return i18n._(
      'Wallets.errors.nameEmpty',
      null,
      { defaults: 'Name should not be empty' },
    )
  } else if (trimmedName.length > 32) {
    return i18n._(
      'Wallets.errors.nameTooLong',
      null,
      { defaults: 'Length of name should not be greater than 32 symbols' },
    )
  }

  const hasInvalidSymbols: boolean = RE_INVALID_NAME.test(trimmedName)

  if (hasInvalidSymbols) {
    return i18n._(
      'Wallets.errors.nameIncludesInvalidChars',
      null,
      { defaults: 'Name should not include invalid symbols' },
    )
  }

  return null
}
