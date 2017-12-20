export default function handle(handler) {
  return (...args) => (/* useless event here */) => handler(...args)
}
