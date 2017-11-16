import i18n from 'i18n/en'

const defaultProps = { isCustom: false, ssl: false }

function getDefaultNetworks() {
  const { main, ropsten, kovan, rinkeby } = i18n.networkManager.knownNetworkTitle

  return [
    { title: main, rpcaddr: '37.59.55.6', rpcport: '10001', ...defaultProps },
    { title: ropsten, rpcaddr: '37.59.55.6', rpcport: '10003', ...defaultProps },
    /*
    { title: main, rpcaddr: '138.197.180.127', rpcport: '20001', ...defaultProps },
    { title: ropsten, rpcaddr: '37.59.55.6', rpcport: '20003', ...defaultProps },
    */
    { title: kovan, rpcaddr: '37.59.55.6', rpcport: '10002', ...defaultProps },
    { title: rinkeby, rpcaddr: '37.59.55.6', rpcport: '10004', ...defaultProps },
    { title: 'Localhost 8545', rpcaddr: 'localhost', rpcport: '8545', ...defaultProps },
  ]
}

export default getDefaultNetworks
