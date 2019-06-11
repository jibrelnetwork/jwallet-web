// @flow strict

function checkWallet(
  wallet: Wallet,
  value: string,
  name: string,
): boolean {
  const propertyValue: string = wallet[name]

  return propertyValue ? (propertyValue.toLowerCase() === value.toLowerCase()) : false
}

export function findWalletByProperty(
  items: Wallets,
  uniqueProperty: string,
  propertyName: string,
): ?Wallet {
  return items.find((wallet: Wallet): boolean => checkWallet(
    wallet,
    uniqueProperty,
    propertyName,
  ))
}
