// @flow

import { t } from 'ttag'

const passwordNotEqual = ({
  passwordNew,
  passwordNewConfirm,
}) =>
  passwordNew !== passwordNewConfirm ?
    { passwordNewConfirm: t`Password does not match confirmation` } : null

const hintRequired = ({ passwordHint }) =>
  !passwordHint ? { passwordHint: t`Password hint is required` } : null

const passwordHintEqualPassword = ({
  passwordOld,
  passwordHint,
}) =>
  passwordOld === passwordHint ? { passwordHint: t`Password and hint should not be equal` } : null

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
