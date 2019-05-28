// @flow strict

import { defaults } from 'lodash-es'

export const allValidators =
  (validators: Array<(Object) => Object>) =>
    (values: Object) =>
      Promise
        .all(
          validators
            .map(validator => validator(values)),
        )
        .then(
          // prefer errors that come first
          errors => defaults({}, ...errors),
        )
