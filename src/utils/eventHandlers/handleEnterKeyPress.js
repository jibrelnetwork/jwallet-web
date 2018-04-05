export default function handleEnterKeyPress(handler, args = []) {
  return (event) => {
    const isEnterPressed = (event.key === 'Enter')

    if (isEnterPressed && handler) {
      return handler(...args)
    }

    return null
  }
}
