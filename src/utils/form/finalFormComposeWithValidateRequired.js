// @flow strict

import {
  trim,
  isNil,
  isString,
} from 'lodash-es'
import { FORM_ERROR } from 'final-form'
import { t } from 'ttag'

export const FORM_ERROR_REQUIRED = 'FINAL_FORM/required-error'

export const finalFormComposeWithValidateRequired = ({
  requiredKeys = [],
  setFormError = true,
}, validate) => values =>
  Promise.resolve()
    .then(
      () =>
        validate
          ? validate(values)
          : {},
    )
    .then((errors = {}) => {
      const requiredError = requiredKeys.reduce((reduceResult, key) => {
        if (reduceResult) {
          return reduceResult
        }

        const value = values[key]

        if (
          isNil(value)
          || (isString(value) && trim(value) === '')
        ) {
          // FIXME: Maybe should make it user-friendly not here, but later on UI?
          return t`Please fill all the required fields`
        }

        return null
      }, null)

      const additionalErrors = {}

      if (requiredError) {
        // eslint-disable-next-line fp/no-mutation
        additionalErrors[FORM_ERROR_REQUIRED] = requiredError

        if (setFormError && !errors[FORM_ERROR]) {
          // eslint-disable-next-line fp/no-mutation
          additionalErrors[FORM_ERROR] = requiredError
        }
      }

      return Object.assign({}, errors, additionalErrors)
    })
