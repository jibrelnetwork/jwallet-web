// @flow

export function trimLeadingZeroes(str: string) {
  // eslint-disable-next-line fp/no-let
  let xChrIdx = 0

  while (str[xChrIdx] === '0' && str[xChrIdx + 1] !== '.' && xChrIdx < str.length) {
    // eslint-disable-next-line fp/no-mutation
    xChrIdx += 1
  }

  return xChrIdx > 0 ? str.substr(xChrIdx) : str
}
