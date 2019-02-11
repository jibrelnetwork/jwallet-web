// @flow

function checkBalanceLoading(balance: ?Balance): boolean {
  return (
    !balance ||
    ((balance.value == null) && (balance.isError == null))
  )
}

export default checkBalanceLoading
