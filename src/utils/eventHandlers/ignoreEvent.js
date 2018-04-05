// @flow

const ignoreEvent = (handler: Function, ...args: Array<any>): Function => (e: Object): void => {
  e.preventDefault()

  if (handler) {
    handler(...args)
  }

  e.stopPropagation()
}

export default ignoreEvent
