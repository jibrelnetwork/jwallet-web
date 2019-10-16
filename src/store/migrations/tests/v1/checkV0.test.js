// @flow strict

import assert from 'assert'

import { checkMigrationV1Needed } from '../../v1'

jest.mock('../../../../utils/encryption/deriveKeyFromPassword', () => ({
  deriveKeyFromPassword: () => null,
}))

jest.mock('../../db', () => ({
  getStoreData: async () => ({}),
  getStoreVersion: async () => 0,
}))

describe('store/migrations/v1/checkV0', () => {
  test('checkMigrationV1Needed should return false', async () => {
    const result = await checkMigrationV1Needed()
    assert.equal(result, false)
  })
})
