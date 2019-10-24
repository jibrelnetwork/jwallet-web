// @flow strict

import assert from 'assert'

import {
  migrateWalletsToV1,
  migratePasswordToV1,
} from '../../v1'

import {
  WALLETS,
  PASSWORD,
} from '../data'

const PSWD = 'super secret p@swd'

jest.mock('../../../../utils/encryption/deriveKeyFromPassword', () => ({
  deriveKeyFromPassword: async (p: string) => (p === 'super secret p@swd') ? new Uint8Array([
    209, 236, 222, 165, 3, 99, 164, 203, 213, 26, 58, 177, 97, 167, 7, 227, 201,
    25, 210, 214, 158, 30, 130, 219, 106, 136, 160, 130, 94, 204, 219, 199,
  ]) : new Uint8Array([
    209, 236, 222, 165, 3, 99, 164, 203, 213, 26, 58, 177, 97, 167, 7, 227, 201,
    25, 210, 214, 158, 30, 130, 9, 8, 7, 6, 5, 4, 3, 2, 1,
  ]),
}))

jest.mock('../../../../utils/encryption/getNonce', () => ({
  getNonce: () => new Uint8Array([
    230, 231, 176, 117, 202, 84, 100, 101, 223, 111, 44, 13,
    176, 123, 248, 79, 35, 140, 212, 8, 199, 196, 164, 123,
  ]),
}))

describe('store/migrations/v1/migrate', () => {
  test('should migrate password to v1', async () => {
    const result: PasswordPersistV1 = await migratePasswordToV1(WALLETS.v0)
    assert.deepEqual(result, PASSWORD.v1)
  })

  test('should migrate wallets to v1', async () => {
    const result: WalletsPersistV1 = await migrateWalletsToV1(
      PSWD,
      WALLETS.v0,
      PASSWORD.v1,
    )
    assert.deepEqual(result, WALLETS.v1)
  })

  test('should throw because password is incorrect', async () => {
    try {
      await migrateWalletsToV1(
        'WRONG P@SWD',
        WALLETS.v0,
        PASSWORD.v1,
      )
    } catch (error) {
      assert.equal(error.message, 'entity.Password.error.invalid')
    }
  })
})
