// @flow strict

export function getErrorMessage(
  meta: FinalFormMeta,
  validateType: ?FinalFormValidateType,
): ?string {
  const error: ?string = meta.error || meta.submitError
  const hasValidateType: boolean = !!validateType && !!meta[validateType]
  const isTouched: boolean  = (validateType === 'touched' && hasValidateType)
  const isVisited: boolean  = (validateType === 'visited' && hasValidateType)
  const isDirty: boolean  = (validateType === 'dirtySinceLastSubmit' && hasValidateType)

  if (isDirty) {
    return error
  } else if (isTouched || isVisited) {
    return error
  }

  return null
}
