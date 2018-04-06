// @flow

export default function handleTargetValue(handler: Function): Function {
  return (event: Object): void => handler(event.target.value)
}
