import i18n from 'i18n/en'

const { knownPathNames } = i18n.modals.derivationPath

export const knownDerivationPaths = [{
  path: 'm/44\'/60\'/0\'/0',
}, {
  path: 'm/44\'/60\'/0\'',
}, {
  path: 'm/44\'/60\'/160720\'/0\'',
}, {
  path: 'm/44\'/61\'/0\'/0',
}, {
  path: 'm/44\'/1\'/0\'/0',
}, {
  path: 'm/44\'/40\'/0\'/0',
}].map(({ path }, index) => ({ path, description: knownPathNames[index] }))

export function isKnownPath(path) {
  let isFound = false

  knownDerivationPaths.forEach((item) => {
    if (item.path === path) {
      isFound = true
    }
  })

  return isFound
}
