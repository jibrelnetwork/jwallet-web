// @flow

function balanceToString(balance: ?number): string {
  if (!balance) {
    return '0.00'
  }

  const integer: number = Math.floor(balance)
  const decimals: string = (balance - integer).toFixed(2).substr(1)

  return `${integer}${decimals}`
}

export default balanceToString
