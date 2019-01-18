// @flow

import checkPasswordStrength from './checkPasswordStrength'

function testPassword(password: string): void {
  const testPasswordResult: PasswordResult = checkPasswordStrength(password)

  if (testPasswordResult.score < 3) {
    const { warning, suggestions } = testPasswordResult.feedback

    throw new Error(warning || suggestions[0] || 'Weak password')
  }
}

export default testPassword
