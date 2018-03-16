// @flow

const isValid = (v: string): boolean => !/\[|\]/.test(v)

const networks: Networks = [{
  id: '1',
  title: 'main',
  rpcaddr: isValid(__MAIN_RPC_ADDR__) ? __MAIN_RPC_ADDR__ : 'ns3089219.ip-37-59-55.eu',
  rpcport: isValid(__MAIN_RPC_PORT__) ? __MAIN_RPC_PORT__ : '10001',
  ssl: true,
  isCustom: false,
}, {
  id: '3',
  title: 'ropsten',
  rpcaddr: isValid(__ROPSTEN_RPC_ADDR__) ? __ROPSTEN_RPC_ADDR__ : 'ropsten.node.jwallet.network',
  rpcport: isValid(__ROPSTEN_RPC_PORT__) ? __ROPSTEN_RPC_PORT__ : '8545',
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
