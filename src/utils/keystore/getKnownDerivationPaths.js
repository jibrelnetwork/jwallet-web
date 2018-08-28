// @flow

import knownPaths from 'data/derivationPaths/knownPaths'

function getKnownDerivationPaths(): DerivationPaths {
  return knownPaths.map(({ path }: { +path: string }, index: Index): DerivationPath => ({
    path,
    description: (i18n('modals.derivationPath.knownPathNames') || [])[index],
  }))
}

export default getKnownDerivationPaths
