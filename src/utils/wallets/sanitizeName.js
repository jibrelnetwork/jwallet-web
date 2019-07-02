// @flow strict

export function sanitizeName(name: string) {
  return name.trim().substring(0, 32).trim().replace(/\//g, '–')
}
