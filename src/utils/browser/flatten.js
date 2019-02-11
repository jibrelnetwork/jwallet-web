// @flow

function flatten<T>(items: { [string]: T }): Array<$NonMaybeType<T>> {
  return Object
    .keys(items)
    .reduce((result: Array<T>, key: string) => {
      const item: ?T = items[key]

      if (!item) {
        return result
      }

      return [
        ...result,
        item,
      ]
    }, [])
}

export default flatten

