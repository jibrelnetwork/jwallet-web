// @flow

function round(value: number, decimals: number, isSmallest?: boolean): string {
  const pow: number = 10 ** decimals
  const valuePow: number = value * pow

  if (isSmallest === undefined) {
    return (Math.round(valuePow) / pow).toFixed(decimals)
  }

  const valueToSmallest: number = isSmallest
    ? Math.floor(valuePow) / pow
    : Math.ceil(valuePow) / pow

  return valueToSmallest.toFixed(decimals)
}

export default round
