// @flow

import { i18n } from 'i18n/lingui'

import nacl from 'tweetnacl'
import util from 'tweetnacl-util'

type DecodedEncryptedData = {|
  +data: Uint8Array,
  +nonce: Uint8Array,
|}

type DecryptPayload = {|
  +key: Uint8Array,
  +data: EncryptedData,
|}

function decodeEncryptedData(data: EncryptedData): DecodedEncryptedData {
  return {
    data: util.decodeBase64(data.data),
    nonce: util.decodeBase64(data.nonce),
  }
}

function decryptNaclSecretbox(data: EncryptedData, key: Uint8Array): string {
  const decoded: DecodedEncryptedData = decodeEncryptedData(data)
  const decryptedData: ?Uint8Array = nacl.secretbox.open(decoded.data, decoded.nonce, key)

  if ((decryptedData === null) || (decryptedData === undefined)) {
    throw new Error(i18n._(
      'entity.Password.error.invalid',
    ))
  }

  return util.encodeUTF8(decryptedData)
}

export function decryptData(payload: DecryptPayload): string {
  const {
    key,
    data,
  }: DecryptPayload = payload

  return decryptNaclSecretbox(data, key)
}
