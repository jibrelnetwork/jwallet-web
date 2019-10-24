// @flow

export type JErrorData<T> = T | string | null

class JError<T> extends Error {
  data: JErrorData<T>

  constructor(data?: JErrorData<T>, message?: string) {
    super((typeof data === 'string') ? data : message)

    this.name = 'JError'
    this.data = (typeof data === 'object') ? data : null

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default JError
