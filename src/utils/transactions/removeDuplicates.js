// @flow

function removeDuplicates(items: TransactionWithPrimaryKeys[]): TransactionWithPrimaryKeys[] {
  return items.reduce((result: TransactionWithPrimaryKeys[], item: TransactionWithPrimaryKeys) => {
    const isFound: boolean =
      !!result.find(({ keys }: TransactionWithPrimaryKeys) => (item.keys.id === keys.id))

    return isFound ? result : [
      ...result,
      item,
    ]
  }, [])
}

export default removeDuplicates
