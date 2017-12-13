export function getKnownDerivationPaths() {
  return [{
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
  }].map(({ path }, index) => ({
    path,
    description: (i18n('modals.derivationPath.knownPathNames') || [])[index],
  }))
}

export function isKnownPath(path) {
  let isFound = false

  getKnownDerivationPaths().forEach((item) => {
    if (item.path === path) {
      isFound = true
    }
  })

  return isFound
}
