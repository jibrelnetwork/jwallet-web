// @flow

type FlattenFn<T, F> = (item: T, key?: string) => F

function flattenWith<T, F>(
  items: { [string]: T },
  fn: FlattenFn<T, F>,
): $NonMaybeType<F>[] {
  return Object
    .keys(items)
    .reduce((result: F[], key: string) => {
      const item: ?T = items[key]

      if (!item) {
        return result
      }

      return [
        ...result,
        fn(item, key),
      ]
    }, [])
}

export default flattenWith
