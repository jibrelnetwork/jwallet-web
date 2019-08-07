// @flow

import {
  type FilterPredicate,
  type FilterPredicateRules,
  compoundFilterPredicate,
} from 'utils/search'

const SEARCH_CONTACTS_RULES: FilterPredicateRules = {
  description: 'words',
  name: 'words',
  address: 'beginning',
}

const FILTER_PREDICATE: FilterPredicate<Favorite> =
  compoundFilterPredicate<Favorite>(SEARCH_CONTACTS_RULES)

export function filterContacts(
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
