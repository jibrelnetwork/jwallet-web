// @flow strict

import assert from 'assert'

import {
  migrateWallets,
  checkWalletsMigrationV1Needed,
} from '../wallets'

import {
  WALLETS,
  PASSWORD,
} from './data'

const PSWD = 'super secret p@swd'

jest.mock('../../../utils/encryption/deriveKeyFromPassword', () => ({
  deriveKeyFromPassword: async (p: string) => (p === 'super secret p@swd') ? new Uint8Array([
    209, 236, 222, 165, 3, 99, 164, 203, 213, 26, 58, 177, 97, 167, 7, 227, 201,
    25, 210, 214, 158, 30, 130, 219, 106, 136, 160, 130, 94, 204, 219, 199,
  ]) : new Uint8Array([
    209, 236, 222, 165, 3, 99, 164, 203, 213, 26, 58, 177, 97, 167, 7, 227, 201,
    25, 210, 214, 158, 30, 130, 9, 8, 7, 6, 5, 4, 3, 2, 1,
  ]),
}))

jest.mock('../../../utils/encryption/getNonce', () => ({
  getNonce: () => new Uint8Array([
    230, 231, 176, 117, 202, 84, 100, 101, 223, 111, 44, 13,
    176, 123, 248, 79, 35, 140, 212, 8, 199, 196, 164, 123,
  ]),
}))

const RESULT_EMPTY = {
  items: [],
  version: 1,
  activeWalletId: null,
}

describe('store/migrations/wallets', () => {
  test('should check if migration to v1 is needed', async () => {
    const versionUndefined = checkWalletsMigrationV1Needed({ wallets: { persist: {} } })
    assert.equal(versionUndefined, true)

    const versionNull = checkWalletsMigrationV1Needed({ wallets: { persist: { version: 0 } } })
    assert.equal(versionNull, true)

    const versionCorrect = checkWalletsMigrationV1Needed({ wallets: { persist: { version: 1 } } })
    assert.equal(versionCorrect, false)
  })

  test('should migrate to v1', async () => {
    const resultWalletsPersistVersionEmpty = await migrateWallets({
      wallets: { persist: WALLETS.v0 },
      password: { persist: PASSWORD.v1 },
    }, PSWD)
    assert.deepEqual(resultWalletsPersistVersionEmpty, WALLETS.v1)

    const resultWalletsPersistVersionCorrect = await migrateWallets({
      wallets: { persist: WALLETS.v1 },
      password: { persist: PASSWORD.v1 },
    }, '')
    assert.deepEqual(resultWalletsPersistVersionCorrect, WALLETS.v1)
  })

  test('should return empty values', async () => {
    const resultStateEmpty = await migrateWallets({}, '')
    assert.deepEqual(resultStateEmpty, RESULT_EMPTY)

    const resultStateWalletsEmpty = await migrateWallets({ wallets: null }, '')
    assert.deepEqual(resultStateWalletsEmpty, RESULT_EMPTY)

    const resultStateWalletsString = await migrateWallets({ wallets: '' }, '')
    assert.deepEqual(resultStateWalletsString, RESULT_EMPTY)

    const resultStateWalletsPersistEmpty = await migrateWallets({ wallets: {} }, '')
    assert.deepEqual(resultStateWalletsPersistEmpty, RESULT_EMPTY)

    const resultStateWalletsPersistNumber = await migrateWallets({ wallets: { persist: 42 } }, '')
    assert.deepEqual(resultStateWalletsPersistNumber, RESULT_EMPTY)

    const resultStatePasswordEmpty = await migrateWallets({
      wallets: { persist: WALLETS.v0 },
    }, '')
    assert.deepEqual(resultStatePasswordEmpty, RESULT_EMPTY)

    const resultStatePasswordPersistEmpty = await migrateWallets({
      wallets: { persist: WALLETS.v0 },
      password: {},
    }, '')
    assert.deepEqual(resultStatePasswordPersistEmpty, RESULT_EMPTY)

    const resultStatePasswordPersistBoolean = await migrateWallets({
      wallets: { persist: WALLETS.v0 },
      password: { persist: false },
    }, '')
    assert.deepEqual(resultStatePasswordPersistBoolean, RESULT_EMPTY)

    const resultStateWalletsPersistWrongVersion = await migrateWallets({
      wallets: {
        persist: {
          ...WALLETS.v1,
          version: 666,
        },
      },
      password: { persist: PASSWORD.v1 },
    }, '')
    assert.deepEqual(resultStateWalletsPersistWrongVersion, RESULT_EMPTY)

    const resultStatePasswordPersistWrongVersion = await migrateWallets({
      wallets: { persist: WALLETS.v0 },
      password: {
        persist: {
          ...PASSWORD.v1,
          version: 2 ** 10,
        },
      },
    }, '')
    assert.deepEqual(resultStatePasswordPersistWrongVersion, RESULT_EMPTY)

    const resultStatePasswordPersistInternalKeyEmpty = await migrateWallets({
      wallets: { persist: WALLETS.v0 },
      password: {
        persist: {
          ...PASSWORD.v1,
          internalKey: null,
        },
      },
    }, '')
    assert.deepEqual(resultStatePasswordPersistInternalKeyEmpty, RESULT_EMPTY)

    const resultStatePasswordPersistSaltNotString = await migrateWallets({
      wallets: { persist: WALLETS.v0 },
      password: {
        persist: {
          ...PASSWORD.v1,
          salt: 0,
        },
      },
    }, '')
    assert.deepEqual(resultStatePasswordPersistSaltNotString, RESULT_EMPTY)
  })

  test('should throw because password is incorrect', async () => {
    try {
      await migrateWallets({
        wallets: { persist: WALLETS.v0 },
        password: { persist: PASSWORD.v1 },
      }, 'WRONG P@SWD')
    } catch (error) {
      assert.equal(error.message, 'entity.Password.error.invalid')
    }
  })
})
