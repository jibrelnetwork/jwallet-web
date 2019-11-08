// @flow strict

export default async function checkPasswordStrength(password: string): Promise<PasswordResult> {
  const { default: zxcvbn } = await import(/* webpackChunkName: "zxcvbn" */ 'zxcvbn')

  return zxcvbn(password)
}
