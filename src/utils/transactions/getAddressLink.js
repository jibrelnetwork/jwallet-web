// @flow

import config from 'config'

function getAddressLink(
  address: Hash,
  networkId: NetworkId,
): string {
  const enpointName: ?string = config.enpointNames[networkId]

  if (!enpointName) {
    return ''
  }

  return `//${enpointName}.${config.blockExplorerLink}/address/${address}`
}

export default getAddressLink
