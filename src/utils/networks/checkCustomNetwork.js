// @flow

function checkCustomNetwork(networkId: ?NetworkId): boolean {
  if (!networkId) {
    return false
  }

  return (networkId.indexOf('private') === 0)
}

export default checkCustomNetwork
