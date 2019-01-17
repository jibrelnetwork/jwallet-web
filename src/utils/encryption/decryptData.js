// @flow

import nacl from 'tweetnacl'
import util from 'tweetnacl-util'

type DecodedEncryptedData = {|
  +data: Uint8Array,
  +nonce: Uint8Array,
|}

type DecryptPayload = {|
  +data: EncryptedData,
  +derivedKey: Uint8Array,
  +encryptionType: string,
|}

function decodeEncryptedData(data: EncryptedData): DecodedEncryptedData {
  return {
    data: util.decodeBase64(data.data),
    nonce: util.decodeBase64(data.nonce),
  }
}

function decryptNaclSecretbox(data: EncryptedData, derivedKey: Uint8Array): string {
  const decoded: DecodedEncryptedData = decodeEncryptedData(data)
  const decryptedData: ?Uint8Array = nacl.secretbox.open(decoded.data, decoded.nonce, derivedKey)

  if ((decryptedData === null) || (decryptedData === undefined)) {
    throw new Error('InvalidPasswordError')
  }

  return util.encodeUTF8(decryptedData).trim()
}

function decryptData(payload: DecryptPayload): string {
  const {
    data,
    derivedKey,
    encryptionType,
  }: DecryptPayload = payload

  if (encryptionType !== 'nacl.secretbox') {
    throw new Error(`DecryptionTypeError ${encryptionType}`)
  }

  return decryptNaclSecretbox(data, derivedKey)
}

export default decryptData
