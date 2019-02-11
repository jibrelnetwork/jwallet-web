// @flow

import config from 'config'

function getTxLink(txHash: Hash, blockExplorerUISubdomain: string): string {
  const uiSubdomainPrefix: string = blockExplorerUISubdomain ? `${blockExplorerUISubdomain}.` : ''

  return `//${uiSubdomainPrefix}${config.blockExplorerUILink}/tx/${txHash}`
}

export default getTxLink
