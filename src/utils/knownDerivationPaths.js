/* eslint-disable quotes */
export const knownDerivationPaths = [{
  path: "m/44'/60'/0'/0", description: 'Default',
}, {
  path: "m/44'/60'/0'", description: 'Ledger (ETH)',
}, {
  path: "m/44'/60'/160720'/0'", description: 'Ledger (ETC)',
}, {
  path: "m/44'/61'/0'/0", description: 'TREZOR (ETC)',
}, {
  path: "m/44'/1'/0'/0", description: 'Network: Testnets',
}, {
  path: "m/44'/40'/0'/0", description: 'Network: Expanse',
}]
/* eslint-enable quotes */

export function isKnownPath(path) {
  let isFound = false

  knownDerivationPaths.forEach((item) => {
    if (item.path === path) {
      isFound = true
    }
  })

  return isFound
}
