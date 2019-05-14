// I want to check that file is exported from index, not from elsewhere
// eslint-disable-next-line unicorn/import-index
import { startsWithOrEndsWith } from '../'

const ADDRESS = '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7'

describe('address startsWithOrEndsWith', () => {
  it('is available', () => {
    expect(startsWithOrEndsWith).toBeDefined()
  })

  it('returns true on full address search', () => {
    expect(startsWithOrEndsWith(ADDRESS, ADDRESS)).toBe(true)
  })

  it('returns true on empty search', () => {
    expect(startsWithOrEndsWith(ADDRESS, '')).toBe(true)
  })

  it('returns true on first symbols search', () => {
    // eslint-disable-next-line more/no-c-like-loops, fp/no-let, fp/no-mutation, no-plusplus
    for (let i = 1; i < ADDRESS.length; i++) {
      const query = ADDRESS.slice(0, i)
      expect(startsWithOrEndsWith(ADDRESS, query)).toBe(true)
    }
  })

  it('returns true on search by first symbols from unprefixed address', () => {
    const UNPREFIXED_ADDRESS = ADDRESS.slice(2)

    // eslint-disable-next-line more/no-c-like-loops, fp/no-let, fp/no-mutation, no-plusplus
    for (let i = 1; i < UNPREFIXED_ADDRESS.length; i++) {
      const query = UNPREFIXED_ADDRESS.slice(0, i)
      expect(startsWithOrEndsWith(ADDRESS, query)).toBe(true)
    }
  })

  it('returns true on last symbols search', () => {
    // eslint-disable-next-line more/no-c-like-loops, fp/no-let, fp/no-mutation, no-plusplus
    for (let i = 1; i < ADDRESS.length; i++) {
      const query = ADDRESS.slice(-i)
      expect(startsWithOrEndsWith(ADDRESS, query)).toBe(true)
    }
  })

  it('returns false on inexistent symbols', () => {
    expect(startsWithOrEndsWith(ADDRESS, 'test')).toBe(false)
  })

  it('returns false on symbols from the middle of the address', () => {
    expect(startsWithOrEndsWith(ADDRESS, ADDRESS.slice(3, ADDRESS.length - 1))).toBe(false)
  })

  it('returns true if searching in upper or lower case', () => {
    expect(startsWithOrEndsWith(ADDRESS, ADDRESS.slice(0, 7).toLowerCase())).toBe(true)
    expect(startsWithOrEndsWith(ADDRESS, ADDRESS.slice(0, 7).toUpperCase())).toBe(true)
  })

  it('returns true if address for search passed in upper or lower case', () => {
    expect(startsWithOrEndsWith(ADDRESS.toLowerCase(), ADDRESS.slice(0, 7))).toBe(true)
    expect(startsWithOrEndsWith(ADDRESS.toUpperCase(), ADDRESS.slice(0, 7))).toBe(true)
  })
})
