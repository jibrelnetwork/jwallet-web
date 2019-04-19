// @flow

import { scryptWorkerInstance } from 'workers/scrypt/wrapper'

export const DERIVED_KEY_LENGTH: number = 32

export async function deriveKeyFromPassword(
  password: string,
  salt: string,
): Promise<Uint8Array> {
  console.log(scryptWorkerInstance)

  return scryptWorkerInstance.executeTask({
    taskName: 'deriveKeyFromPassword',
    payload: {
      salt,
      password,
      dkLen: DERIVED_KEY_LENGTH,
    },
  })
}
