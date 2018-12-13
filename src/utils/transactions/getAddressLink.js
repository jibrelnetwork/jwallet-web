// @flow

import config from 'config'

function getAddressLink(address: ?Address, blockExplorerSubdomain: string): string {
  const subdomainPrefix: string = blockExplorerSubdomain ? `${blockExplorerSubdomain}.` : ''

  return address
    ? `//${subdomainPrefix}${config.blockExplorerLink}/address/${address}`
    : ''
}

export default getAddressLink
