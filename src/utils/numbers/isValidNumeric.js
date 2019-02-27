// @flow

type IsValidNumericValue = string | number

export default function isValidNumeric(value: IsValidNumericValue): boolean {
  return !Number.isNaN(Number(value))
}
