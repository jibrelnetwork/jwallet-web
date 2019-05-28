import { FORM_ERROR } from 'final-form'

// I want to check that file is exported from index, not from elsewhere
/* eslint-disable unicorn/import-index */
import {
  FORM_ERROR_REQUIRED,
  validateRequired,
} from '../'
/* eslint-enable unicorn/import-index */

describe('form validateRequired', () => {
  it('is available', () => {
    expect(validateRequired).toBeDefined()
  })

  it('has exposed constant to required fields validation', () => {
    expect(FORM_ERROR_REQUIRED).toBeDefined()
  })

  it('checks all values for empty if required fields is null', () => {
    const validateNull = validateRequired(null)

    expect(validateNull({
      foo: 'foo',
      bar: null,
      foobar: '',
    })).toHaveProperty(FORM_ERROR_REQUIRED)

    const validateUndefined = validateRequired()

    expect(validateUndefined({
      foo: 'foo',
      bar: null,
      foobar: '',
    })).toHaveProperty(FORM_ERROR_REQUIRED)
  })

  it('does not show additional error if required fields are empty', () => {
    const validate = validateRequired([])

    expect(validate({
      foo: 'foo',
      bar: null,
      foobar: '',
    })).toEqual({})
  })

  it('shows error for all sorts of empty values', () => {
    const validate = validateRequired(['test'])

    expect(validate({ test: '' })).toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate({ test: '     ' })).toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate({ test: null })).toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate({ test: undefined })).toHaveProperty(FORM_ERROR_REQUIRED)

    expect(validate({ test: 'test' })).not.toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate({ test: 100 })).not.toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate({ test: false })).not.toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate({ test: true })).not.toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate({ test: [] })).not.toHaveProperty(FORM_ERROR_REQUIRED)
  })

  it('adds general form error if it is turned on by config', () => {
    const values = { test: null }
    const validate = validateRequired(null, {
      setFormError: true,
    })

    expect(validate(values)).toHaveProperty(FORM_ERROR_REQUIRED)
    expect(validate(values)).toHaveProperty(FORM_ERROR)
  })
})
