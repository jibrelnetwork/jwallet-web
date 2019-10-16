// @flow strict

export function leftPad(
  stringToPad: string,
  padChar: string,
  totalLength: number,
) {
  const padLength: number = totalLength - stringToPad.length
  const leftPadStr: string = (padLength > 0) ? padChar.repeat(padLength) : ''

  return `${leftPadStr}${stringToPad}`
}
