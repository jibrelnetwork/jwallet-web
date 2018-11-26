// @flow

import config from 'config'

function getAddressLink(
  txHash: Hash,
  address: Hash,
  networkId: NetworkId,
): string {
  const enpointName: ?string = config.enpointNames[networkId]

  if (!enpointName) {
    return ''
  }

  return `//${enpointName}.${config.blockExplorerLink}/${address}/${txHash}`
}

export default getAddressLink
