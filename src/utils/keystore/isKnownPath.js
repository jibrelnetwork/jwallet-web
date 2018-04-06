// @flow

import knownPaths from '../../data/derivationPaths'

export default function isKnownPath(p: string): boolean {
  return (knownPaths.filter(({ path }: { path: string }): boolean => (path === p)).length > 0)
}
