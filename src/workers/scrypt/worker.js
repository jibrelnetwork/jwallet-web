// @flow strict

import scrypt from 'scryptsy'

type ScryptWorkerInMessage = {|
  +data: {|
    +payload: {|
      salt: string,
      password: string,
      dkLen: number,
    |},
    +taskId: string,
    +taskName: string,
  |},
|}

type ScryptWorkerOutMessage = {|
  +payload: Uint8Array,
  +taskId: string,
|}

export type ScryptWorkerInstance = {|
  onmessage: (ScryptWorkerInMessage) => void,
  +postMessage: (ScryptWorkerOutMessage) => void,
|}

const SCRYPT_PARAMS: ScryptParams = {
  /**
   * 2 ** 18 - complexity like geth
   * 2 ** 14 - recommended Scrypt complexity
   */
  N: __DEV__ ? 2 ** 14 : 2 ** 18,
  r: 8,
  p: 1,
}

/* eslint-disable-next-line no-restricted-globals */
const scryptWorker: ScryptWorkerInstance = self

scryptWorker.onmessage = (msg: ScryptWorkerInMessage): void => {
  const {
    payload: {
      salt,
      password,
      dkLen,
    },
    taskId,
    taskName,
  } = msg.data

  switch (taskName) {
    case 'deriveKeyFromPassword': {
      const {
        N,
        r,
        p,
      }: ScryptParams = SCRYPT_PARAMS

      const derivedKeyBuf: Buffer = scrypt(password, salt, N, r, p, dkLen)
      const derivedKey: Uint8Array = new Uint8Array(derivedKeyBuf)

      scryptWorker.postMessage({
        taskId,
        payload: derivedKey,
      })

      break
    }

    default:
      break
  }
}
