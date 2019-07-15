// @flow

import { i18n } from 'i18n/lingui'

const passwordNotEqual = ({
  passwordNew,
  passwordNewConfirm,
}) =>
  passwordNew !== passwordNewConfirm
    ? {
      passwordNewConfirm: i18n._(
        'common.password.validate.passwordsNotMatch',
        null,
        { defaults: 'Password does not match confirmation' },
      ),
    }
    : null

const hintRequired = ({ passwordHint }) =>
  !passwordHint
    ? {
      passwordHint: i18n._(
        'common.password.validate.hintRequired',
        null,
        { defaults: 'Password hint is required' },
      ),
    }
    : null

const passwordHintEqualPassword = ({
  passwordOld,
  passwordHint,
}) =>
  passwordOld === passwordHint
    ? {
      passwordHint: i18n._(
        'common.password.validate.hintEqualsPassword',
        null,
        { defaults: 'Password and hint should not be equal' },
      ),
    }
    : null

const validationsList = [
  passwordNotEqual,
  hintRequired,
  passwordHintEqualPassword,
]

const checkPassword = (formState: Object): Object =>
  validationsList.reduce((invalidMessages, validation) => ({
    ...invalidMessages,
    ...validation(formState),
  }), {})

export default checkPassword
