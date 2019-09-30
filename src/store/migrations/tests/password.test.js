// @flow strict

import assert from 'assert'

import { WALLETS } from './data'

import {
  migratePassword,
  checkPasswordMigrationV1Needed,
} from '../password'

const RESULT = {
  version: 1,
  internalKey: WALLETS.v0.internalKey,
  salt: WALLETS.v0.passwordOptions.salt,
  hint: WALLETS.v0.passwordOptions.passwordHint,
}

const RESULT_EMPTY = {
  salt: '',
  hint: '',
  version: 1,
  internalKey: null,
}

describe('store/migrations/password', () => {
  test('should check if migration to v1 is needed', async () => {
    const versionUndefined = checkPasswordMigrationV1Needed({ password: { persist: {} } })
    assert.equal(versionUndefined, true)

    const versionNull = checkPasswordMigrationV1Needed({ password: { persist: { version: 0 } } })
    assert.equal(versionNull, true)

    const versionCorrect = checkPasswordMigrationV1Needed({ password: { persist: { version: 1 } } })
    assert.equal(versionCorrect, false)
  })

  test('should migrate to v1', async () => {
    const resultWalletsPersistVersionEmpty = await migratePassword({
      wallets: { persist: WALLETS.v0 },
    })
    assert.deepEqual(resultWalletsPersistVersionEmpty, RESULT)

    const resultPasswordPersistVersionEmpty = await migratePassword({
      wallets: { persist: WALLETS.v0 },
      password: { persist: RESULT },
    })
    assert.deepEqual(resultPasswordPersistVersionEmpty, RESULT)

    const resultPasswordPersistVersionCorrect = await migratePassword({
      wallets: {
        persist: {
          ...WALLETS.v0,
          version: 1,
        },
      },
      password: {
        persist: RESULT,
      },
    })
    assert.deepEqual(resultPasswordPersistVersionCorrect, RESULT)
  })

  test('should return empty values', async () => {
    const resultStateEmpty = await migratePassword({})
    assert.deepEqual(resultStateEmpty, RESULT_EMPTY)

    const resultStateWalletsEmpty = await migratePassword({ wallets: null })
    assert.deepEqual(resultStateWalletsEmpty, RESULT_EMPTY)

    const resultStateWalletsString = await migratePassword({ wallets: '' })
    assert.deepEqual(resultStateWalletsString, RESULT_EMPTY)

    const resultStateWalletsPersistEmpty = await migratePassword({ wallets: {} })
    assert.deepEqual(resultStateWalletsPersistEmpty, RESULT_EMPTY)

    const resultStateWalletsPersistNumber = await migratePassword({ wallets: { persist: 42 } })
    assert.deepEqual(resultStateWalletsPersistNumber, RESULT_EMPTY)

    const resultStatePasswordEmpty = await migratePassword({ wallets: { persist: { version: 2 } } })
    assert.deepEqual(resultStatePasswordEmpty, RESULT_EMPTY)

    const resultStatePasswordBoolean = await migratePassword({
      wallets: { persist: { version: 2 } },
      password: false,
    })
    assert.deepEqual(resultStatePasswordBoolean, RESULT_EMPTY)

    const resultStatePasswordPersistEmpty = await migratePassword({
      wallets: { persist: { version: 2 } },
      password: { persist: undefined },
    })
    assert.deepEqual(resultStatePasswordPersistEmpty, RESULT_EMPTY)

    const resultStatePasswordPersistVersionWrong = await migratePassword({
      wallets: { persist: { version: 2 } },
      password: { persist: { version: 0 } },
    })
    assert.deepEqual(resultStatePasswordPersistVersionWrong, RESULT_EMPTY)
  })
})
