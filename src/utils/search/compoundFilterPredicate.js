// @flow strict

import { get } from 'lodash-es'

import {
  strip0x,
  checkHex,
} from 'utils/address'

export type FilterPredicateRuleType = 'anywhere' | 'beginning' | 'words'
export type FilterPredicateRules = { [string]: FilterPredicateRuleType }
export type FilterPredicate<T> = (entity: T, query: string) => boolean

const RE_SPACE: RegExp = new RegExp(/ /)

function getIndex(value: string, query: string): number {
  const preparedQuery: string = checkHex(query) ? strip0x(query) : String(query)
  const preparedValue: string = checkHex(value) ? strip0x(value) : String(value)

  return preparedValue.toLowerCase().indexOf(preparedQuery)
}

function checkAnywhere(value: string, query: string): boolean {
  return (getIndex(value, query) !== -1)
}

function checkBeginning(value: string, query: string): boolean {
  return (getIndex(value, query) === 0)
}

function checkWords(value: string, query: string): boolean {
  if (RE_SPACE.test(query)) {
    return checkAnywhere(value, query)
  }

  return !!value
    .split(' ')
    .map((word: string): boolean => checkBeginning(word, query))
    .find((i: boolean): boolean => i)
}

export function compoundFilterPredicate<T>(rules: FilterPredicateRules): FilterPredicate<T> {
  return function filterPredicate(entity: T, query: string): boolean {
    const queryLC: string = query.toLowerCase().trim()

    if (!queryLC) {
      return true
    }

    return !!Object.keys(rules).map((path: string) => {
      const value: ?string = get(entity, path)

      if (!value) {
        return false
      }

      const rule: FilterPredicateRuleType = rules[path]

      switch (rule) {
        case 'anywhere':
          return checkAnywhere(value, queryLC)

        case 'beginning':
          return checkBeginning(value, queryLC)

        case 'words':
          return checkWords(value, queryLC)

        default:
          return false
      }
    }).find((i: boolean): boolean => i)
  }
}
