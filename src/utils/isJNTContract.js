import find from 'lodash/find'

import mainTokens from 'data/assets/main'

export default function isJNTContract(contractAddress) {
  return (contractAddress === (find(mainTokens, { symbol: 'JNT' }) || {}).address)
}
