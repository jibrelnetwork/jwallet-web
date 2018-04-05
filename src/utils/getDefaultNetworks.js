export default function getDefaultNetworks() {
  return [{
    id: 1,
    title: i18n('networkManager.knownNetworkTitle.main'),
    rpcaddr: 'main-node.jwallet.network',
    rpcport: '443',
    ssl: true,
    isCustom: false,
  }, {
    id: 3,
    title: i18n('networkManager.knownNetworkTitle.ropsten'),
    rpcaddr: 'ropsten-node.jwallet.network',
    rpcport: '443',
    ssl: true,
    isCustom: false,
  }, {
    id: 0,
    title: 'Localhost 8545',
    rpcaddr: 'localhost',
    rpcport: '8545',
    ssl: true,
    isCustom: false,
  }]
}
