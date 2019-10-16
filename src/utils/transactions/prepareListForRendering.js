// @flow strict

import {
  type FilterPredicate,
  type FilterPredicateRules,
  compoundFilterPredicate,
} from 'utils/search'

import { getNote } from '.'

type FilterOptions = {|
  +isErrorFiltered: boolean,
  +isPendingFiltered: boolean,
|}

const SEARCH_TRANSACTIONS_RULES: FilterPredicateRules = {
  note: 'words',
  to: 'beginning',
  toName: 'words',
  hash: 'beginning',
  from: 'beginning',
  fromName: 'words',
  blockHash: 'beginning',
  contractAddress: 'beginning',
}

const FILTER_PREDICATE: FilterPredicate<TransactionWithNoteAndNames> =
  compoundFilterPredicate<TransactionWithNoteAndNames>(SEARCH_TRANSACTIONS_RULES)

function checkETHType(eventType: TransactionEventType): boolean {
  return !eventType
}

function getDuplicate(
  one: TransactionWithNoteAndNames,
  two: TransactionWithNoteAndNames,
): ?TransactionWithNoteAndNames {
  if (one.keys.id === two.keys.id) {
    return one
  }

  // if one or two is ETH transaction
  if (checkETHType(one.eventType) || checkETHType(two.eventType)) {
    const isDuplicated: boolean = (one.hash === two.hash)

    if (!isDuplicated) {
      return null
    }

    // return ETH item
    return checkETHType(one.eventType) ? one : two
  }

  return null
}

function removeDuplicates(items: TransactionWithNoteAndNames[]): TransactionWithNoteAndNames[] {
  return items.reduce((
    result: TransactionWithNoteAndNames[],
    item: TransactionWithNoteAndNames,
  ) => {
    const found: ?TransactionWithNoteAndNames = result.reduce((
      duplicate: ?TransactionWithNoteAndNames,
      i: TransactionWithNoteAndNames,
    ): ?TransactionWithNoteAndNames => duplicate || getDuplicate(
      i,
      item,
    ), null)

    if (!found) {
      return [
        ...result,
        item,
      ]
    }

    // if current item is duplicate
    if (item.keys.id === found.keys.id) {
      return result
    }

    const resultWithoutDuplicates: TransactionWithNoteAndNames[] = result
      .filter((i: TransactionWithNoteAndNames): boolean => (i.keys.id !== found.keys.id))

    return [
      ...resultWithoutDuplicates,
      item,
    ]
  }, [])
}

function checkError(
  {
    receiptData,
    isRemoved,
  }: TransactionWithNoteAndNames,
  isErrorFiltered: boolean,
): boolean {
  if (!receiptData) {
    return false
  }

  const isFailed: boolean = (!receiptData.status || isRemoved)

  return isErrorFiltered && isFailed
}

function checkPending(
  { blockHash }: TransactionWithNoteAndNames,
  isPendingFiltered: boolean,
): boolean {
  return isPendingFiltered && !blockHash
}

function checkFiltersResult(
  result: boolean,
  flag: boolean,
): boolean {
  if (result || flag) {
    return true
  }

  return false
}

function checkItem(
  item: TransactionWithNoteAndNames,
  {
    isErrorFiltered,
    isPendingFiltered,
  }: FilterOptions,
): boolean {
  return [
    checkError(
      item,
      isErrorFiltered,
    ),
    checkPending(
      item,
      isPendingFiltered,
    ),
  ].reduce(checkFiltersResult, false)
}

function filter(
  items: TransactionWithNoteAndNames[],
  filters: FilterOptions,
): TransactionWithNoteAndNames[] {
  const {
    isErrorFiltered,
    isPendingFiltered,
  }: FilterOptions = filters

  if (!(isErrorFiltered || isPendingFiltered)) {
    return items
  }

  return items.filter((item: TransactionWithNoteAndNames): boolean => checkItem(
    item,
    filters,
  ))
}

function search(
  items: TransactionWithNoteAndNames[],
  searchQuery: string,
): TransactionWithNoteAndNames[] {
  if (!searchQuery) {
    return items
  }

  return items.filter((item: TransactionWithNoteAndNames): boolean => FILTER_PREDICATE(
    item,
    searchQuery,
  ))
}

function sortTransactions(
  items: TransactionWithNoteAndNames[],
  direction: SortDirection = 'desc',
): TransactionWithNoteAndNames[] {
  // eslint-disable-next-line fp/no-mutating-methods
  return [...items].sort((
    first: TransactionWithNoteAndNames,
    second: TransactionWithNoteAndNames,
  ): number => {
    const firstValue: number = first.blockData ? first.blockData.timestamp : 0
    const secondValue: number = second.blockData ? second.blockData.timestamp : 0

    if (firstValue > secondValue) {
      return (direction === 'asc') ? 1 : -1
    } else if (firstValue < secondValue) {
      return (direction === 'asc') ? -1 : 1
    } else {
      return 0
    }
  })
}

export function prepareListForRendering(
  items: TransactionWithPrimaryKeys[],
  notes: Comments,
  names: AddressNames,
  searchQuery: string,
  filters: FilterOptions,
): TransactionWithNoteAndNames[] {
  const list: TransactionWithNoteAndNames[] = items.map((
    item: TransactionWithPrimaryKeys,
  ): TransactionWithNoteAndNames => ({
    ...item,
    toName: item.to && names[item.to],
    fromName: item.from && names[item.from],
    note: getNote(notes, item.keys.id, item.hash),
  }))

  const cleaned: TransactionWithNoteAndNames[] = removeDuplicates(list)
  const filtered: TransactionWithNoteAndNames[] = filter(cleaned, filters)
  const found: TransactionWithNoteAndNames[] = search(filtered, searchQuery)
  const sorted: TransactionWithNoteAndNames[] = sortTransactions(found)

  return sorted
}
