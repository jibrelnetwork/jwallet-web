const defaultProps = { isCustom: false, ssl: false }
const defaultNetworks = [
  { title: 'Main Ethereum Network', rpcaddr: '37.59.55.6', rpcport: '10001', ...defaultProps },
  { title: 'Ropsten Test Network', rpcaddr: '37.59.55.6', rpcport: '10003', ...defaultProps },
  { title: 'Kovan Test Network', rpcaddr: '37.59.55.6', rpcport: '10002', ...defaultProps },
  { title: 'Rinkeby Test Network', rpcaddr: '37.59.55.6', rpcport: '10004', ...defaultProps },
  { title: 'Localhost 8545', rpcaddr: 'localhost', rpcport: '8545', ...defaultProps },
]

export default defaultNetworks
