// @flow

function getTxAmount(amount: number, decimals: number): number {
  return amount / (10 ** decimals)
}

export default getTxAmount
