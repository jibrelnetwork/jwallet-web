// @flow

import { find, propEq } from 'ramda'

import mainTokens from 'data/assets/main'

const isJNT = (contractAddress: Address): boolean => {
  const jnt = find(propEq('symbol', 'JNT'))(mainTokens)

  if (!jnt) {
    return false
  }

  return (contractAddress === jnt.address)
}

export default isJNT
