// @flow

import { capitalize } from 'lodash-es'

type SplitName = {|
  name: string,
  firstChar: string,
|}

export function splitContactName(name: string): SplitName[] {
  const splittedName = name.trim().split(/\s+/)

  return splittedName.map((namePart) => {
    const normalizedName = capitalize(namePart.trim())

    return {
      name: normalizedName,
      // Some special voodoo magic for emoji splitting
      firstChar: [...normalizedName][0],
    }
  })
}
