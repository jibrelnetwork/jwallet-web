import tokens from './tokens'

const ethereum = {
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
  address: '',
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
  isCustom: false,
}

const networksTokensMap = {
  1: 'main',
  3: 'ropsten',
}

export default function getDefaultDigitalAssets(networkId) {
  const tokensName = networksTokensMap[networkId]
  const defaultTokens = tokens[tokensName] || []

  return [ethereum, ...defaultTokens]
}
