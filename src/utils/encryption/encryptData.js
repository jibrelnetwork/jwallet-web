// @flow strict

import nacl from 'tweetnacl'
import util from 'tweetnacl-util'
import { i18n } from 'i18n/lingui'

import { getNonce } from '.'

type EncryptPayload = {|
  +data: string,
  +key: Uint8Array,
|}

function encodeEncryptedData(
  encryptedData: Uint8Array,
  nonce: Uint8Array,
): EncryptedData {
  return {
    nonce: util.encodeBase64(nonce),
    data: util.encodeBase64(encryptedData),
  }
}

function encryptNaclSecretbox(
  data: string,
  key: Uint8Array,
): EncryptedData {
  const nonce: Uint8Array = getNonce(nacl.secretbox.nonceLength)
  const dataToEncrypt: Uint8Array = util.decodeUTF8(data)

  const encryptedData: ?Uint8Array = nacl.secretbox(
    dataToEncrypt,
    nonce,
    key,
  )

  if ((encryptedData === null) || (encryptedData === undefined)) {
    throw new Error(i18n._(
      'encryption.errors.passwordInvalid',
      null,
      { defaults: 'Invalid Password' },
    ))
  }

  return encodeEncryptedData(encryptedData, nonce)
}

export function encryptData(payload: EncryptPayload): EncryptedData {
  const {
    key,
    data,
  }: EncryptPayload = payload

  return encryptNaclSecretbox(
    data,
    key,
  )
}
