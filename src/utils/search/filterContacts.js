// @flow

import {
  startsWithOrEndsWith,
} from 'utils/address'

export function filterContacts(
  contacts: Favorite[],
  searchQuery: string,
): Favorite[] {
  const query: string = searchQuery.trim().toLowerCase()

  return !query
    ? contacts
    : contacts.filter(({
      name, description, address,
    }) => (name && name.toLowerCase().search(query) !== -1) ||
      (description && description.toLowerCase().search(query) !== -1) ||
      startsWithOrEndsWith(address, query))
}
