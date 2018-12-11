// @flow

import config from 'config'

function getAddressLink(address: ?Address, blockExplorerSubdomain: string): string {
  return address
    ? `//${blockExplorerSubdomain}.${config.blockExplorerLink}/address/${address}`
    : ''
}

export default getAddressLink
