// @flow strict

import {
  trim,
  isNil,
  isString,
} from 'lodash-es'
import { FORM_ERROR } from 'final-form'
import { t } from 'ttag'

export const FORM_ERROR_REQUIRED = 'FINAL_FORM/required-error'

function isValueEmpty(value) {
  return isNil(value)
    || (isString(value) && trim(value) === '')
}

export const validateRequired =
  (requiredKeys: ?string[], {
    setFormError = false,
  } = {}) =>
    (values: Object) => {
      // all keys are required if none is specified
      // FIXME: or should we better excludeKeys?
      const validateKeys = requiredKeys || Object.keys(values)

      const requiredError = validateKeys.reduce((reduceResult, key) => {
        if (reduceResult) {
          return reduceResult
        }

        if (isValueEmpty(values[key])) {
          // FIXME: Maybe should make it user-friendly not here, but later on UI?
          return t`Please fill all the required fields`
        }

        return null
      }, null)

      const errors = {}

      if (requiredError) {
        // eslint-disable-next-line fp/no-mutation
        errors[FORM_ERROR_REQUIRED] = requiredError

        if (setFormError && !errors[FORM_ERROR]) {
          // eslint-disable-next-line fp/no-mutation
          errors[FORM_ERROR] = requiredError
        }
      }

      return errors
    }
