// @flow

import nacl from 'tweetnacl'
import util from 'tweetnacl-util'

import config from 'config'

type EncryptPayload = {|
  +data: string,
  +derivedKey: Uint8Array,
  +encryptionType: string,
|}

function leftPadString(stringToPad: string, padChar: string, totalLength: number) {
  const padLength: number = totalLength - stringToPad.length
  const leftPad: string = (padLength > 0) ? padChar.repeat(padLength) : ''

  return `${leftPad}${stringToPad}`
}

function getNonce(nonceLength: number): Uint8Array {
  return nacl.randomBytes(nonceLength)
}

function encodeEncryptedData(encryptedData: Uint8Array, nonce: Uint8Array): EncryptedData {
  return {
    nonce: util.encodeBase64(nonce),
    data: util.encodeBase64(encryptedData),
  }
}

function encryptNaclSecretbox(data: string, derivedKey: Uint8Array): EncryptedData {
  const nonce: Uint8Array = getNonce(nacl.secretbox.nonceLength)
  const dataToEncrypt: Uint8Array = util.decodeUTF8(data)
  const encryptedData: ?Uint8Array = nacl.secretbox(dataToEncrypt, nonce, derivedKey)

  if ((encryptedData === null) || (encryptedData === undefined)) {
    throw new Error('InvalidPasswordError')
  }

  return encodeEncryptedData(encryptedData, nonce)
}

function encryptData(payload: EncryptPayload): EncryptedData {
  const {
    data,
    derivedKey,
    encryptionType,
  }: EncryptPayload = payload

  if (encryptionType !== 'nacl.secretbox') {
    throw new Error(`EncryptionTypeError ${encryptionType}`)
  }

  const dataPad: string = leftPadString(data, ' ', config.encryptedDataLength)

  return encryptNaclSecretbox(dataPad, derivedKey)
}

export default encryptData
