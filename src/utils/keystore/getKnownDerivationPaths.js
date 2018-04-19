// @flow

import knownPaths from 'data/derivationPaths'

const getKnownDerivationPaths = () => {
  return knownPaths.map(({ path }, index) => ({
    path,
    description: (i18n('modals.derivationPath.knownPathNames') || [])[index],
  }))
}

export default getKnownDerivationPaths
