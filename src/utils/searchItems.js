export default function searchItems(items, searchQuery, searchFields) {
  if (!(searchQuery && searchQuery.length)) {
    return items
  }

  const isSearchFieldsPresent = (searchFields && searchFields.length)

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
