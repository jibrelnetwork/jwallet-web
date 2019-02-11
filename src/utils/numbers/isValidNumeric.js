// @flow

export default function isValidNumeric(value: string | number): boolean {
  return !Number.isNaN(Number(value))
}
