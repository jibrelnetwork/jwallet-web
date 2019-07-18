// @flow strict

export function sanitizeName(name: string) {
  return name
    .replace(/ +/g, ' ') // replace series of spaces: '  ' -> ' '
    .trim() // trim spaces before cutting: ' wallet ' -> 'wallet'
    .substring(0, 32) // left just first 32 symbols
    .trim() // trim spaces again (they could appear after cutting)
    .replace(/\//g, '–') // replace prohibited symbols: 'wallet / address' -> 'wallet - address'
}
