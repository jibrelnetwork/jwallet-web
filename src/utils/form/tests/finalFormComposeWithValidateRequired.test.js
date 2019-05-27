import { FORM_ERROR } from 'final-form'

// I want to check that file is exported from index, not from elsewhere
/* eslint-disable unicorn/import-index */
import {
  FORM_ERROR_REQUIRED,
  finalFormComposeWithValidateRequired,
} from '../'
/* eslint-enable unicorn/import-index */

describe('form finalFormComposeWithValidateRequired', () => {
  it('is available', () => {
    expect(finalFormComposeWithValidateRequired).toBeDefined()
  })

  it('has exposed constant to required fields validation', () => {
    expect(FORM_ERROR_REQUIRED).toBeDefined()
  })

  it('does not show additional error if no required fields specified', async () => {
    const validate = finalFormComposeWithValidateRequired({}, () => {})

    await expect(validate({
      foo: 'foo',
      bar: null,
      foobar: '',
    })).resolves.toEqual({})
  })

  it('shows error for all variety of empty values', async () => {
    const validate = finalFormComposeWithValidateRequired({
      requiredKeys: ['test'],
    }, () => {})

    await expect(validate({ test: '' })).resolves.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate({ test: '     ' })).resolves.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate({ test: null })).resolves.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate({ test: undefined })).resolves.toHaveProperty([FORM_ERROR_REQUIRED])

    await expect(validate({ test: 'test' })).resolves.not.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate({ test: 100 })).resolves.not.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate({ test: false })).resolves.not.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate({ test: true })).resolves.not.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate({ test: [] })).resolves.not.toHaveProperty([FORM_ERROR_REQUIRED])
  })

  it('adds 1 additional error on any number of required fields', async () => {
    const values = {
      foo: 'foo',
      bar: null,
      foobar: '',
    }
    const validateOne = finalFormComposeWithValidateRequired({
      requiredKeys: ['bar'],
    }, () => {})

    await expect(validateOne(values)).resolves.toHaveProperty([FORM_ERROR_REQUIRED])

    const validateTwo = finalFormComposeWithValidateRequired({
      requiredKeys: ['bar', 'foobar'],
    }, () => {})

    await expect(validateTwo(values)).resolves.toHaveProperty([FORM_ERROR_REQUIRED])
  })

  it('adds general form error if it is turned on by config', async () => {
    const values = { test: null }
    const validate = finalFormComposeWithValidateRequired({
      requiredKeys: ['test'],
      setFormError: true,
    }, () => {})

    await expect(validate(values)).resolves.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate(values)).resolves.toHaveProperty([FORM_ERROR])
  })

  it('does not change general form error if it is already specified', async () => {
    const values = { test: null }
    const validate = finalFormComposeWithValidateRequired({
      requiredKeys: ['test'],
      setFormError: true,
    }, () => ({
      [FORM_ERROR]: 'Test',
    }))

    await expect(validate(values)).resolves.toHaveProperty([FORM_ERROR_REQUIRED])
    await expect(validate(values)).resolves.toHaveProperty([FORM_ERROR], 'Test')
  })
})
