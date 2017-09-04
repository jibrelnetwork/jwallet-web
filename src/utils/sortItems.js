export default function sortItems(items, oldField, newfield) {
  const direction = (newfield === oldField) ? 'DESC' : 'ASC'
  const sortedItems = [...items]

  sortedItems.sort((firstItem, secondItem) => {
    if (direction === 'ASC') {
      return (firstItem[newfield] < secondItem[newfield])
    } else if (direction === 'DESC') {
      return (firstItem[newfield] > secondItem[newfield])
    }

    return 0
  })

  return {
    items: sortedItems,
    sortField: newfield,
    sortDirection: direction,
  }
}
