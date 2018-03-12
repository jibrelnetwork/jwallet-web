import tokens from 'data/assets'

export const ethereum = {
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
  address: 'Ethereum',
  isActive: true,
  isCustom: false,
}

const networksTokensMap = {
  1: 'main',
}

export default function getDefaultDigitalAssets(networkId) {
  const tokensName = networksTokensMap[networkId]
  const defaultTokens = tokens[tokensName] || []

  return [ethereum, ...defaultTokens]
}
