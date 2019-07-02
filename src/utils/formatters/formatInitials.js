// @flow

import { splitContactName } from 'utils/formatters/splitContactName'

export function formatInitials(name: string): ?string {
  const dividedName = splitContactName(name)

  switch (dividedName.length) {
    case 0:
      return null
    case 1:
      return dividedName[0].firstChar
    default:
      return `${dividedName[0].firstChar}${dividedName[1].firstChar}`
  }
}
