export class InvalidFieldError {
  constructor(fieldName, message) {
    this.fieldName = fieldName
    this.message = message
    this.name = 'InvalidFieldError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidFieldError)
    } else {
      this.stack = (new Error()).stack
    }
  }
}
