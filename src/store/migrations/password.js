// @flow strict

import * as type from 'utils/type'

export function checkPasswordV0(state: Object): boolean {
  return (state.wallets && state.wallets.persist && !!state.wallets.persist.internalKey)
}

export function checkPasswordMigrationV1Needed(state: Object): boolean {
  const isOldPasswordExist: boolean = checkPasswordV0(state)
  const passwordData: Object = state.password

  if (type.isVoid(passwordData) || !type.isObject(passwordData)) {
    return isOldPasswordExist
  }

  const passwordPersist: Object = passwordData.persist

  if (type.isVoid(passwordPersist) || !type.isObject(passwordPersist)) {
    return isOldPasswordExist
  }

  const { version }: Object = passwordPersist

  return (!version || (version < 1)) && isOldPasswordExist
}

async function getEmptyLatest(): Promise<PasswordPersist> {
  return {
    internalKey: null,
    hint: '',
    salt: '',
    version: 1,
  }
}

async function migratePasswordToV1(walletsPersist: Object): Promise<PasswordPersistV1> {
  const {
    internalKey,
    passwordOptions,
  }: Object = walletsPersist

  if (
    type.isVoid(internalKey) ||
    !type.isObject(internalKey) ||
    type.isVoid(passwordOptions) ||
    !type.isObject(passwordOptions)
  ) {
    return getEmptyLatest()
  }

  const {
    salt,
    passwordHint,
  }: Object = passwordOptions

  if (!type.isString(salt) || !type.isString(passwordHint)) {
    return getEmptyLatest()
  }

  return {
    salt,
    internalKey,
    hint: passwordHint,
    version: 1,
  }
}

export async function migratePassword(state: Object): Promise<PasswordPersist> {
  const walletsData: Object = state.wallets

  if (type.isVoid(walletsData) || !type.isObject(walletsData)) {
    return getEmptyLatest()
  }

  const walletsPersist: Object = walletsData.persist

  if (type.isVoid(walletsPersist) || !type.isObject(walletsPersist)) {
    return getEmptyLatest()
  }

  if (!walletsPersist.version) {
    return migratePasswordToV1(walletsPersist)
  }

  const passwordData: Object = state.password

  if (type.isVoid(passwordData) || !type.isObject(passwordData)) {
    return getEmptyLatest()
  }

  const passwordPersist: Object = passwordData.persist

  if (type.isVoid(passwordPersist) || !type.isObject(passwordPersist)) {
    return getEmptyLatest()
  }

  if (!passwordPersist.version) {
    return migratePasswordToV1(walletsPersist)
  }

  switch (passwordPersist.version) {
    case 1:
      return passwordPersist

    default:
      return getEmptyLatest()
  }
}
