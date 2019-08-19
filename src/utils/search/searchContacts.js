// @flow strict

import {
  type FilterPredicate,
  type FilterPredicateRules,
  compoundFilterPredicate,
} from './compoundFilterPredicate'

const SEARCH_CONTACTS_RULES: FilterPredicateRules = {
  name: 'words',
  address: 'beginning',
  description: 'words',
}

const FILTER_PREDICATE: FilterPredicate<Favorite> =
  compoundFilterPredicate<Favorite>(SEARCH_CONTACTS_RULES)

export function searchContacts(
  items: Favorite[],
  searchQuery: string,
): Favorite[] {
  if (!searchQuery) {
    return items
  }

  return items.filter((item: Favorite): boolean => FILTER_PREDICATE(
    item,
    searchQuery,
  ))
}
