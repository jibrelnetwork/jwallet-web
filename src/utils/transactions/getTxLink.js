// @flow

import config from 'config'

function getTxLink(txHash: Hash, blockExplorerSubdomain: string): string {
  const subdomainPrefix: string = blockExplorerSubdomain ? `${blockExplorerSubdomain}.` : ''

  return `//${subdomainPrefix}${config.blockExplorerLink}/tx/${txHash}`
}

export default getTxLink
