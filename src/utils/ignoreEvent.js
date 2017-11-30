export default function ignoreEvent(handler, ...args) {
  return (e) => {
    e.preventDefault()

    handler(...args)

    e.stopPropagation()
  }
}
