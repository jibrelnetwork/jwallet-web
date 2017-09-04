const symbolNameMap = {
  ETH: 'Ethereum',
  jUSD: 'United Stated dollar',
  jEUR: 'Euro',
  jGBP: 'Pound sterling',
  jAED: 'UAE dirham',
  jCNY: 'Chinese yuan',
  jRUB: 'Russian ruble',
  JNT: 'Jibrel Network Token',
}

export default function getTokenNameBySymbolName(symbolName) {
  if (!(symbolName && symbolName.length)) {
    return ''
  }

  return symbolNameMap[symbolName]
}
