// @flow

/* eslint-disable fp/no-rest-parameters */
function ignoreEvent(handler: ?Function): Function {
  return (...args: any[]): Function => (event: Object): void => {
    event.preventDefault()

    if (handler) {
      handler(...args)
    }

    event.stopPropagation()
  }
}
/* eslint-enable fp/no-rest-parameters */

export default ignoreEvent
