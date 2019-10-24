// @flow strict

import assert from 'assert'

import { checkMigrationV1Needed } from '../../v1'

jest.mock('../../../../utils/encryption/deriveKeyFromPassword', () => ({
  deriveKeyFromPassword: () => null,
}))

jest.mock('../../db', () => ({
  getStoreVersion: async () => 0,
  getStoreData: async () => ({ items: [{}] }),
}))

describe('store/migrations/v1/checkV0WithItems', () => {
  test('checkMigrationV1Needed should return true', async () => {
    const result = await checkMigrationV1Needed()
    assert.equal(result, true)
  })
})
