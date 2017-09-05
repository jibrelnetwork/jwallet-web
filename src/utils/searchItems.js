export default function searchItems(items, searchQuery) {
  if (!(searchQuery && searchQuery.length)) {
    return items
  }

  const foundItems = []

  items.forEach((item) => {
    let isFound = false

    Object.keys(item).forEach((key) => {
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
