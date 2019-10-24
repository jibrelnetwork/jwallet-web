// @flow strict

export function checkPrivateKeyValid(privateKey: string): boolean {
  return (/^(0x)?[0-9a-fA-F]{64}$/i.test(privateKey))
}
