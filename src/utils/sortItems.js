import sortBy from 'lodash/sortBy'

export default function sortItems(items, oldField, newField, oldDirection) {
  const isASC = (oldDirection === 'ASC')
  const isChangingDirection = (newField === oldField)
  const isNeedToReverse = (isASC && isChangingDirection)

  return {
    sortField: newField,
    sortDirection: getSortDirection(isNeedToReverse),
    items: getSortedItems(items, newField, isNeedToReverse),
  }
}

function getSortedItems(items, newField, isNeedToReverse) {
  const lowerCaseItems = getLowerCaseItems(items, newField)
  const sortedItems = sortBy(lowerCaseItems, newField)
  const mappedItems = sortedItems.map(({ index }) => items[index])

  if (isNeedToReverse) {
    mappedItems.reverse()
  }

  return mappedItems
}

function getLowerCaseItems(items, newField) {
  return items.map((i, index) => ({
    index,
    [newField]: getLowerCaseField(i[newField]),
  }))
}

function getLowerCaseField(field) {
  return (typeof field === 'string') ? field.toLowerCase() : field
}

function getSortDirection(isNeedToReverse) {
  return isNeedToReverse ? 'DESC' : 'ASC'
}
