// @flow

function getTxFee(gasUsed: number, gasPrice: number, decimals: number): number {
  return (gasUsed * gasPrice) / (10 ** decimals)
}

export default getTxFee
