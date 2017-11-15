import sortBy from 'lodash/sortBy'

export default function sortItems(items, oldField, newField, oldDirection) {
  const isASC = (oldDirection === 'ASC')
  const changeDirection = (newField === oldField)

  const lowerCaseItems = items.map((i, index) => ({
    index,
    [newField]: ((typeof i[newField] === 'string') ? i[newField].toLowerCase() : i[newField])
  }))

  const sortedItems = sortBy(lowerCaseItems, newField)
  const mappedItems = sortedItems.map(({ index }) => items[index])

  if (changeDirection && isASC) {
    mappedItems.reverse()
  }

  return {
    items: mappedItems,
    sortField: newField,
    sortDirection: (changeDirection && isASC) ? 'DESC' : 'ASC',
  }
}
