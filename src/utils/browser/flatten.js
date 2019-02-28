// @flow

function flatten<T>(items: { [string]: T }): $NonMaybeType<T>[] {
  return Object
    .keys(items)
    .reduce((result: T[], key: string) => {
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

