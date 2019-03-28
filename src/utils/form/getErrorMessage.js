// @flow

function getErrorMessage(meta: FinalFormMeta, validateType: ?JInputValidateType): ?string {
  const err = meta.error || meta.submitError

  const error = (typeof err === 'string')
    ? err
    : err instanceof Error && err.message
      ? err.message
      : ''

  if (validateType === 'dirtySinceLastSubmit' && !meta[validateType]) {
    return error
  } else if ((validateType === 'touched' || validateType === 'visited') && meta[validateType]) {
    return error
  }

  return undefined
}

export { getErrorMessage }
