// @flow strict

function checkMetaValidateType(
  meta: FinalFormMeta,
  validateType: ?FinalFormValidateType,
): boolean {
  return !!validateType && !!meta[validateType]
}

export function getErrorMessage(
  meta: FinalFormMeta,
  validateType: ?FinalFormValidateType,
  hasErrorsWhileSubmitting?: boolean = false,
): ?string {
  if (!hasErrorsWhileSubmitting && !!meta.submitting) {
    return null
  }

  const error: ?string = meta.error || meta.submitError
  const isDirtySinceLastSubmit: boolean = checkMetaValidateType(meta, 'dirtySinceLastSubmit')
  const isTouched: boolean = (validateType === 'touched') && checkMetaValidateType(meta, 'touched')
  const isVisited: boolean = (validateType === 'visited') && checkMetaValidateType(meta, 'visited')
  const isDirty: boolean = ((validateType === 'dirtySinceLastSubmit') && !isDirtySinceLastSubmit)

  if (isDirty) {
    return error
  } else if (isTouched || isVisited) {
    return error
  }

  return null
}
