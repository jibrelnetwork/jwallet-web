// @flow

export const isAnchor = (uri: string): boolean => !!uri && uri.startsWith('#')

export const isExternal = (uri: string): boolean => !!uri &&
  (uri.startsWith('//') || /^\w+:/.test(uri))
