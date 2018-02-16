// @flow

import { equals, toLower } from 'ramda'

import { InvalidFieldError } from './errors'

const validateKeyName = (name: string, keys: Accounts) => {
  if (!name) {
    throw new InvalidFieldError('name', i18n('general.error.name.empty'))
  }

  if (/[^a-z0-9 ]/ig.test(name)) {
    throw new InvalidFieldError('name', i18n('general.error.name.invalid'))
  }

  validateNameUniq(name, keys)
}

const validateNameUniq = (name: string, keys: Accounts) => {
  keys.forEach((key: Account) => {
    const newKeyName: string = toLower(name.trim())
    const isEqual: boolean = equals(newKeyName, toLower(key.accountName))

    if (isEqual) {
      throw new InvalidFieldError('name', i18n('general.error.name.exists'))
    }
  })
}

export default validateKeyName
