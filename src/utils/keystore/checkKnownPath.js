// @flow

import knownPaths from 'data/derivationPaths/knownPaths'

function checkKnownPath(path: string): boolean {
  return !!knownPaths
    .find((derivationPath: { +path: string }): boolean => (derivationPath.path === path))
}

export default checkKnownPath
