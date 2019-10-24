// @flow strict

import {
  type FilterPredicate,
  type FilterPredicateRules,
  compoundFilterPredicate,
} from './compoundFilterPredicate'

const SEARCH_WALLETS_RULES: FilterPredicateRules = {
  name: 'words',
}

const SEARCH_ADDRESSES_RULES: FilterPredicateRules = {
  name: 'words',
  address: 'beginning',
}

const FILTER_WALLETS_PREDICATE: FilterPredicate<RecipientPickerWallet> =
  compoundFilterPredicate<RecipientPickerWallet>(SEARCH_WALLETS_RULES)

const FILTER_ADDRESSES_PREDICATE: FilterPredicate<RecipientPickerWalletAddress> =
  compoundFilterPredicate<RecipientPickerWalletAddress>(SEARCH_ADDRESSES_RULES)

export function searchRecipientWallets(
  items: RecipientPickerWallet[],
  searchQuery: string,
): RecipientPickerWallet[] {
  const query: string = searchQuery.trim().toLowerCase()

  if (!query) {
    return items
  }

  return items.map((item: RecipientPickerWallet): ?RecipientPickerWallet => {
    const isWalletFound: boolean = FILTER_WALLETS_PREDICATE(
      item,
      searchQuery,
    )

    if (isWalletFound) {
      return item
    }

    const addresses: RecipientPickerWalletAddress[] = item.addresses
      .filter((address: RecipientPickerWalletAddress): boolean => FILTER_ADDRESSES_PREDICATE(
        address,
        searchQuery,
      ))

    if (addresses.length) {
      return {
        ...item,
        addresses,
      }
    }

    return null
  }).filter(Boolean)
}
