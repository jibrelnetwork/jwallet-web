// @flow

const passwordNotEqual = ({ passwordNew, passwordNewConfirm }) =>
  passwordNew !== passwordNewConfirm ?
    { passwordNewConfirm: 'Password does not match confirmation' } : null

const hintRequired = ({ passwordHint }) =>
  !passwordHint ? { passwordHint: 'Password hint is required' } : null

const passwordHintEqualPassword = ({ passwordOld, passwordHint }) =>
  passwordOld === passwordHint ? { passwordHint: 'Password and hint should not be equal' } : null

const validationsList = [
  passwordNotEqual,
  hintRequired,
  passwordHintEqualPassword,
]

const checkPassword = (formState: Object): Object =>
  validationsList.reduce((invalidMessages, validation) =>
    ({ ...invalidMessages, ...validation(formState) }), {})

export default checkPassword
