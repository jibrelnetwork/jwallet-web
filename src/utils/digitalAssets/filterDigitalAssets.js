// @flow

const filterDigitalAssets: Function = (
  items: DigitalAssets,
  balances: Balances,
  type: DigitalAssetsListType,
): DigitalAssets => {
  switch (type) {
    case 'balance': {
      return items.filter(({ address }: DigitalAsset): boolean => (balances[address] > 0))
    }

    case 'popular': {
      return items.filter(({ address, isCustom }: DigitalAsset): boolean => {
        const isZero: boolean = (balances[address] === 0)

        return (isZero && !isCustom)
      })
    }

    case 'custom': {
      return items.filter(({ isCustom }: DigitalAsset): boolean => isCustom)
    }

    default:
      return items
  }
}

export default filterDigitalAssets
