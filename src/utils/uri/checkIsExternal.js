// @flow

export const checkIsExternal = (uri: string): boolean => !!uri &&
  (uri.startsWith('//') || /^\w+:/.test(uri))
