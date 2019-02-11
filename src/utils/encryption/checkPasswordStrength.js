// @flow

import zxcvbn from 'zxcvbn'

function checkPasswordStrength(password: string): PasswordResult {
  return zxcvbn(password)
}

export default checkPasswordStrength
