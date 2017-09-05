export default function sortItems(items, oldField, newfield, oldDirection) {
  const isASC = (oldDirection === 'ASC')
  const changeDirection = (newfield === oldField)
  const sortedItems = [...items]

  sortedItems.sort((firstItem, secondItem) => {
    return (firstItem[newfield] > secondItem[newfield])
  })

  if (changeDirection && isASC) {
    sortedItems.reverse()
  }

  return {
    items: sortedItems,
    sortField: newfield,
    sortDirection: (changeDirection && isASC) ? 'DESC' : 'ASC',
  }
}
