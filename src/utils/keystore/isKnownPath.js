// @flow

import knownPaths from '../../data/derivationPaths'

const isKnownPath = p => (knownPaths.filter(({ path }) => (path === p)).length > 0)

export default isKnownPath
