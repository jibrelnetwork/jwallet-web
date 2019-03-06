// @flow

class Deferred<T> {
  promise: Promise<T>
  resolve: (result: T) => any
  reject: (err: Error) => any

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}

export default Deferred
