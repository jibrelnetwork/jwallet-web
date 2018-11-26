// @flow

import config from 'config'

function getTxLink(
  txHash: Hash,
  networkId: NetworkId,
): string {
  const enpointName: ?string = config.enpointNames[networkId]

  if (!enpointName) {
    return ''
  }

  return `//${enpointName}.${config.blockExplorerLink}/tx/${txHash}`
}

export default getTxLink
