// @flow

/* eslint-disable fp/no-rest-parameters */
function handle(handler: Function) {
  return (...args: Array<any>) => (/* useless event here */) => handler(...args)
}
/* eslint-enable fp/no-rest-parameters */

export default handle
