// @flow

function getENVVar(key: string): ?string {
  if (!key || (typeof window === 'undefined')) {
    return null
  }

  const value: ?string = window[key]

  if (!value) {
    return null
  }

  return !/\[|\]/.test(value) ? value : null
}

export default getENVVar
