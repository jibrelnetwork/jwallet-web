// @flow

import config from 'config'

function getTxLink(txHash: Hash, blockExplorerSubdomain: string): string {
  return `//${blockExplorerSubdomain}.${config.blockExplorerLink}/tx/${txHash}`
}

export default getTxLink
