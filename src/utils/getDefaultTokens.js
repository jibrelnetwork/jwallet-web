import tokens from './tokens'

const ethereum = {
  name: 'Ethereum',
  symbol: 'ETH',
  decimals: 18,
  address: '',
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
}

const networksTokensMap = {
  'Main Ethereum Network': 'main',
  'Ropsten Test Network': 'ropsten',
}

export default function getDefaultTokens(networkName) {
  const tokensName = networksTokensMap[networkName]
  const defaultTokens = tokens[tokensName] || []

  return [ethereum, ...defaultTokens]
}
