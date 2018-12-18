// @flow

import getAddressWithChecksum from './getAddressWithChecksum'

function checkAddressWithChecksumValid(address: string): boolean {
  return (/^0x[0-9a-fA-F]{40}$/i.test(address) && (getAddressWithChecksum(address) === address))
}

export default checkAddressWithChecksumValid
