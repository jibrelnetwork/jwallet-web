// @flow

import config from 'config'

function getAddressLink(address: Address, blockExplorerUISubdomain: string): string {
  const uiSubdomainPrefix: string = blockExplorerUISubdomain ? `${blockExplorerUISubdomain}.` : ''

  return `//${uiSubdomainPrefix}${config.blockExplorerUILink}/address/${address}`
}

export default getAddressLink
