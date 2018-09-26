// @flow

type SyntheticInputEventElement<E> = {
  target: E
} & SyntheticEvent<EventTarget>;

function handleTargetValue(handler: (string) => void) {
  return (event: SyntheticInputEventElement<HTMLInputElement>): void => handler(event.target.value)
}

export default handleTargetValue
