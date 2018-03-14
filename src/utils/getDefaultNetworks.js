export default function getDefaultNetworks() {
  return [{
    id: 1,
    title: i18n('networkManager.knownNetworkTitle.main'),
    rpcaddr: isValid(__MAIN_RPC_ADDR__) ? __MAIN_RPC_ADDR__ : 'ns3089219.ip-37-59-55.eu',
    rpcport: isValid(__MAIN_RPC_PORT__) ? __MAIN_RPC_PORT__ : '10001', // parity node
    // rpcaddr: 'node.jwallet.network',
    // rpcport: '8545',
    ssl: true,
    isCustom: false,
  }, {
    id: 3,
    title: i18n('networkManager.knownNetworkTitle.ropsten'),
    rpcaddr: isValid(__ROPSTEN_RPC_ADDR__) ? __ROPSTEN_RPC_ADDR__ : 'ropsten.node.jwallet.network',
    rpcport: isValid(__ROPSTEN_RPC_PORT__) ? __ROPSTEN_RPC_PORT__ : '8545', // parity node
    ssl: true,
    isCustom: false,
  }, /* {
    id: 1,
    title: main,
    rpcaddr: '138.197.180.127',
    rpcport: '20001', // geth node
    ssl: true,
    isCustom: false,
  }, {
    id: 3,
    title: i18n('networkManager.knownNetworkTitle.ropsten'),
    rpcaddr: 'ns3089219.ip-37-59-55.eu',
    rpcport: '10003', // geth node
    ssl: true,
    isCustom: false,
  }, /* {
    title: kovan,
    rpcaddr: '37.59.55.6',
    rpcport: '10002',
    ssl: true,
    isCustom: false,
  }, {
    title: rinkeby,
    rpcaddr: '37.59.55.6',
    rpcport: '10004',
    ssl: true,
    isCustom: false,
  }, */ {
    id: 0,
    title: 'Localhost 8545',
    rpcaddr: 'localhost',
    rpcport: '8545',
    ssl: true,
    isCustom: false,
  }]
}

const isValid = (v: string): boolean => !/\[|\]/.test(v)
