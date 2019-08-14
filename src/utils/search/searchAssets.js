// @flow strict

import {
  type FilterPredicate,
  type FilterPredicateRules,
  compoundFilterPredicate,
} from './compoundFilterPredicate'

const SEARCH_ASSETS_RULES: FilterPredicateRules = {
  name: 'words',
  symbol: 'beginning',
  'blockchainParams.address': 'beginning',
}

const FILTER_PREDICATE: FilterPredicate<DigitalAssetWithBalance> =
  compoundFilterPredicate<DigitalAssetWithBalance>(SEARCH_ASSETS_RULES)

export function searchAssets(
  items: DigitalAssetWithBalance[],
  searchQuery: string,
): DigitalAssetWithBalance[] {
  if (!searchQuery) {
    return items
  }

  return items.filter((item: DigitalAssetWithBalance): boolean => FILTER_PREDICATE(
    item,
    searchQuery,
  ))
}
