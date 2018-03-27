// @flow

const isValid = (v: string): boolean => !/\[|\]/.test(v)

const networks: Networks = [{
  id: '1',
  title: 'main',
  rpcaddr: isValid(__MAIN_RPC_ADDR__) ? __MAIN_RPC_ADDR__ : 'main-node.jwallet.network',
  rpcport: isValid(__MAIN_RPC_PORT__) ? __MAIN_RPC_PORT__ : '443',
  ssl: true,
  isCustom: false,
}, {
  id: '3',
  title: 'ropsten',
  rpcaddr: isValid(__ROPSTEN_RPC_ADDR__) ? __ROPSTEN_RPC_ADDR__ : 'ropsten-node.jwallet.network',
  rpcport: isValid(__ROPSTEN_RPC_PORT__) ? __ROPSTEN_RPC_PORT__ : '443',
  ssl: true,
  isCustom: false,
}, {
  id: 'private',
  title: 'localhost',
  rpcaddr: 'localhost',
  rpcport: '8545',
  ssl: true,
  isCustom: false,
}]

export default networks
