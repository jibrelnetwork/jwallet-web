import find from 'lodash/find'

import mainTokens from './tokens/main'

export default function isJNTContract(contractAddress) {
  return (contractAddress === (find(mainTokens, { symbol: 'JNT' }) || {}).address)
}
