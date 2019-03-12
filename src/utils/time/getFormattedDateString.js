// @flow

import { t } from 'ttag'

type GetFormattedDateStringInput = Date | string | number

type TokensData = {|
  +usedTokens: string[],
  +str: string,
|}

const MONTHS = [
  t`January`,
  t`February`,
  t`March`,
  t`April`,
  t`May`,
  t`June`,
  t`July`,
  t`August`,
  t`Septemner`,
  t`October`,
  t`November`,
  t`December`,
]

function getFormattedDateString(
  dateObj: GetFormattedDateStringInput,
  format: string = 'hh:mm MM/DD/YYYY',
  isUTC: boolean = false,
): string {
  const date: Date = (dateObj instanceof Date) ? dateObj : new Date(dateObj)

  const _year: number = isUTC ? date.getUTCFullYear() : date.getFullYear()
  const _monthZero: number = isUTC ? date.getUTCMonth() : date.getMonth()
  const _month: number = _monthZero + 1
  const _date: number = isUTC ? date.getUTCDate() : date.getDate()
  const _hour: number = isUTC ? date.getUTCHours() : date.getHours()
  const _min: number = isUTC ? date.getUTCMinutes() : date.getMinutes()
  const _sec: number = isUTC ? date.getUTCSeconds() : date.getSeconds()

  const tokens: { [string]: string } = {
    MMMM: MONTHS[_monthZero],
    MMM: MONTHS[_monthZero].substr(0, 3),
    MM: `${(_month > 9) ? '' : '0'}${_month}`,
    M: `${_month}`,
    DD: `${(_date > 9) ? '' : '0'}${_date}`,
    D: `${_date}`,
    YYYY: `${_year}`,
    YY: `${_year}`.substr(2),
    hh: `${(_hour > 9) ? '' : '0'}${_hour}`,
    h: `${_hour}`,
    mm: `${(_min > 9) ? '' : '0'}${_min}`,
    m: `${_min}`,
    ss: `${(_sec > 9) ? '' : '0'}${_sec}`,
    s: `${_sec}`,
  }

  return Object
    .keys(tokens)
    .reduce((result: TokensData, token: string): TokensData => {
      /**
       * Check if token already used
       * e.g. M/MM/MMM tokens will be skipped if MMMM is used
       */
      const isTokenUsed: boolean = !!result.usedTokens
        .filter((usedToken: string): boolean => (usedToken.indexOf(token) > -1))
        .length

      /**
       * Push used token (if any)
       * replace token from source string with value of that token
       */
      if (!isTokenUsed && result.str.indexOf(token) > -1) {
        return {
          usedTokens: result.usedTokens.concat(token),
          str: result.str.replace(token, tokens[token]),
        }
      }

      return result
    }, {
      usedTokens: [],
      str: format,
    })
    /**
     * usedTokens not needed now, so return just result str
     */
    .str
}

export default getFormattedDateString
