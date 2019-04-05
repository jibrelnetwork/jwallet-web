// @flow strict

export function getErrorMessage(
  meta: FinalFormMeta,
  validateType: ?FinalFormValidateType,
): ?string {
  const error = meta.error || meta.submitError

  const isDirty = (validateType === 'dirtySinceLastSubmit' && !meta[validateType])
  const isTouched = (validateType === 'touched' && meta[validateType])
  const isVisited = (validateType === 'visited' && meta[validateType])

  if (isDirty) {
    return error
  } else if (isTouched || isVisited) {
    return error
  }

  return null
}
