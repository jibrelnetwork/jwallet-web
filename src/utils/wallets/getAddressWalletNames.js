// @flow

export default function getAddressWalletNames(wallets: Wallets): AddressNames {
  return wallets.reduce((result: AddressNames, { type, name, address }: Wallet) => {
    const isAddressType: boolean = (type === 'address')

    if (isAddressType && address) {
      return {
        ...result,
        [address]: name,
      }
    }

    return result
  }, {})
}
