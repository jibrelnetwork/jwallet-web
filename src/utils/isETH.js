import ethereum from 'data/assets/ethereum'

const isETH = (assetAddress: Address): boolean => (assetAddress === ethereum.address)

export default isETH
