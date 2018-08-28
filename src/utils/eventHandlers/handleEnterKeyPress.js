// @flow

function handleEnterKeyPress(handler: Function, args: Array<any> = []): Function {
  return (event: Object): void => {
    const isEnterPressed: boolean = (event.key === 'Enter')

    if (isEnterPressed && handler) {
      handler(...args)
    }
  }
}

export default handleEnterKeyPress
