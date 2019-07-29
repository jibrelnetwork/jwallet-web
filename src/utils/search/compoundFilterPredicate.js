// @flow strict

import { get } from 'lodash-es'

export type FilterPredicateRuleType = 'anywhere' | 'beginning' | 'words'
export type FilterPredicateRules = { [string]: FilterPredicateRuleType }
export type FilterPredicate<T> = (entity: T, query: string) => boolean

function getIndex(value: string, query: string): number {
  return value.toString().toLowerCase().indexOf(query)
}

function checkAnywhere(value: string, query: string): boolean {
  return (getIndex(value, query) !== -1)
}

function checkBeginning(value: string, query: string): boolean {
  return (getIndex(value, query) === 0)
}

export function compoundFilterPredicate<T>(rules: FilterPredicateRules): FilterPredicate<T> {
  return function filterPredicate(entity: T, query: string): boolean {
    if (!query) {
      return true
    }

    const queryLC: string = query.toLowerCase()

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
          return !!value
            .split(' ')
            .map((word: string): boolean => checkBeginning(word, queryLC))
            .find((i: boolean): boolean => i)

        default:
          return false
      }
    }).find((i: boolean): boolean => i)
  }
}
