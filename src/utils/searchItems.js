import isEmpty from 'lodash/isEmpty'

export default function searchItems(items, searchQuery, searchFields) {
  if (isEmpty(searchQuery)) {
    return items
  }

  const isSearchFieldsPresent = !isEmpty(searchFields)
  const foundItems = []

  items.forEach((item) => {
    let isFound = false

    Object.keys(item).forEach((key) => {
      if (!(isSearchFieldsPresent && searchFields.indexOf(key) !== -1)) {
        return
      }

      const value = item[key].toString().toLowerCase()

      if (value.indexOf(searchQuery.toLowerCase()) > -1) {
        isFound = true
      }
    })

    if (isFound) {
      foundItems.push(item)
    }
  })

  return foundItems
}
