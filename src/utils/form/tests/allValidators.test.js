// I want to check that file is exported from index, not from elsewhere
// eslint-disable-next-line unicorn/import-index
import { allValidators } from '../'

describe('form allValidators', () => {
  it('is available', () => {
    expect(allValidators).toBeDefined()
  })

  it('returns function', () => {
    expect(allValidators([])).toBeInstanceOf(Function)
  })

  it('runs without validators', async () => {
    const validator = allValidators([])
    await expect(validator({ test: 'test' })).resolves.toEqual({})
  })

  it('runs with sync validators', async () => {
    const validator = allValidators([
      () => ({}),
      () => ({}),
      () => ({}),
      () => ({}),
    ])
    await expect(validator({ test: 'test' })).resolves.toEqual({})
  })

  it('runs with async validators', async () => {
    const validator = allValidators([
      () => Promise.resolve({}),
      () => Promise.resolve({}),
      () => Promise.resolve({}),
      () => Promise.resolve({}),
    ])
    await expect(validator({ test: 'test' })).resolves.toEqual({})
  })

  it('runs with mixed sync and async validators', async () => {
    const validator = allValidators([
      () => ({}),
      () => Promise.resolve({}),
      () => Promise.resolve({}),
      () => ({}),
    ])
    await expect(validator({ test: 'test' })).resolves.toEqual({})
  })

  it('returns errors from all validators', async () => {
    const validator = allValidators([
      () => ({
        a: 'a',
      }),
      () => Promise.resolve({
        b: 'b',
      }),
      () => Promise.resolve({
        c: 'c',
        d: 'd',
      }),
      () => ({
        e: 'e',
      }),
    ])

    await expect(validator({ test: 'test' })).resolves.toEqual({
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
      e: 'e',
    })
  })

  it('prefers errors that come first', async () => {
    const validator = allValidators([
      () => ({
        a: 'a',
      }),
      () => Promise.resolve({
        a: 'b',
      }),
      () => Promise.resolve({
        a: 'c',
        b: 'd',
      }),
      () => ({
        b: 'e',
      }),
    ])

    await expect(validator({ test: 'test' })).resolves.toEqual({
      a: 'a',
      b: 'd',
    })
  })
})
