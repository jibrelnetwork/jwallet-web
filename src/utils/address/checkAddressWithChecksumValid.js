// @flow

import getAddressChecksum from './getAddressChecksum'

function checkAddressWithChecksumValid(address: string): boolean {
  return (/^0x[0-9a-fA-F]{40}$/i.test(address) && (getAddressChecksum(address) === address))
}

export default checkAddressWithChecksumValid
