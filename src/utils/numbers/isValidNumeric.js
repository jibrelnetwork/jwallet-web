// @flow

export default function isValidNumeric(value: any): boolean {
  return !Number.isNaN(Number(value))
}
