// @flow

function checkPasswordStrength(password: string): Promise<PasswordResult> {
  return import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')
    .then(({ default: zxcvbn }) => zxcvbn(password))
}

export default checkPasswordStrength
