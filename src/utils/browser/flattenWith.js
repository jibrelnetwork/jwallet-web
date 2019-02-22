// @flow

type flattenFn<T, F> = (item: T, key?: string) => F

function flattenWith<T, F>(
  items: { [string]: T },
  fn: flattenFn<T, F>
): Array<$NonMaybeType<F>> {
  return Object
    .keys(items)
    .reduce((result: Array<F>, key: string) => {
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
