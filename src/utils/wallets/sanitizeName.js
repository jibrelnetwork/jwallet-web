// @flow strict

export function sanitizeName(name: string) {
  return name.substring(0, 32).trim().replace(/\//g, '–')
}
