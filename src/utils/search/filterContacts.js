// @flow

import {
  startsWithOrEndsWith,
} from 'utils/address'

import escapeRegExp from 'utils/regexp/escapeRegExp'

export function filterContacts(
  contacts: Favorite[],
  searchQuery: string,
): Favorite[] {
  const query: string = searchQuery.trim().toLowerCase()

  return !query
    ? contacts
    : contacts.filter(({
      name, description, address,
    }) => (name && name.toLowerCase().search(escapeRegExp(query)) !== -1) ||
      (description && description.toLowerCase().search(escapeRegExp(query)) !== -1) ||
      startsWithOrEndsWith(address, query))
}
