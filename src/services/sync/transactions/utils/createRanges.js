// @flow strict

type ExclusionList = boolean[] | {
  [id: number]: any,
}

export function createRanges(
  start: number,
  end: number,
  maxStep: number,
  excludeList: ExclusionList = [],
) {
  const all = (new Array(end - start + 1)).fill(true)
  const ranges = all.reduce((reduceResult, item, idx) => {
    if (reduceResult.length === 0) {
      if (excludeList[idx]) {
        return reduceResult
      }

      // Add range that is available for future extension
      // eslint-disable-next-line fp/no-mutating-methods
      reduceResult.push({
        start: idx,
        end: idx,
        inProgress: true,
      })

      return reduceResult
    }

    const lastRangeIdx = reduceResult.length - 1
    const lastRange = reduceResult[lastRangeIdx]

    if (excludeList[idx]) {
      // Close latest range for extension
      reduceResult[lastRangeIdx] = {
        start: lastRange.start,
        end: lastRange.end,
      }

      return reduceResult
    }

    if (lastRange.inProgress && (lastRange.end - lastRange.start + 1 < maxStep)) {
      // Extend range
      reduceResult[lastRangeIdx].end = idx

      return reduceResult
    }

    // Close latest range for extension and open the new one
    reduceResult[lastRangeIdx] = {
      start: lastRange.start,
      end: lastRange.end,
    }

    // eslint-disable-next-line fp/no-mutating-methods
    reduceResult.push({
      start: idx,
      end: idx,
      inProgress: true,
    })

    return reduceResult
  }, [])

  const lastRange = ranges[ranges.length - 1]

  // eslint-disable-next-line fp/no-mutation
  ranges[ranges.length - 1] = {
    start: lastRange.start,
    end: lastRange.end,
  }

  return ranges
}
