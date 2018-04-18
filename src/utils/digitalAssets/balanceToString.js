// @flow

export default function balanceToString(balance: ?number): string {
  const integer: number = balance ? Math.floor(balance) : 0
  const decimals: string = balance ? (balance - integer).toFixed(2).substr(1) : '.00'

  return `${integer.toFixed()}${decimals}`
}
