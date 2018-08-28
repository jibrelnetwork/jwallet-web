// @flow

/* eslint-disable fp/no-rest-parameters */
function ignoreEvent(handler: ?Function) {
  return (...args: Array<any>) => (event: Object): void => {
    event.preventDefault()

    if (handler) {
      handler(...args)
    }

    event.stopPropagation()
  }
}
/* eslint-enable fp/no-rest-parameters */

export default ignoreEvent
