// @flow

const ignoreEvent = (handler: ?Function) => (...args: Array<any>) => (event: Object): void => {
  event.preventDefault()

  if (handler) {
    handler(...args)
  }

  event.stopPropagation()
}

export default ignoreEvent
