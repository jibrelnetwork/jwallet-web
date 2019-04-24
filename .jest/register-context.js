jest.mock('public/assets/logo/logo-white.svg', () => './logo-white.svg')
jest.mock('public/assets/logo/logo-blue.svg', () => './logo-blue.svg')

jest.mock('../src/utils/sprite/spriteUI', () => ({
  keys: () => [],
}))

jest.mock('../src/utils/sprite/spriteAssets', () => ({
  keys: () => [],
}))

jest.mock('../src/workers/scrypt/worker', () => class MOCK_WORKER {
  onerror: ?Function
  onmessage: ?Function

  constructor() {
    this.onerror = null
    this.onmessage = null
  }

  terminate = () => {}

  postMessage = (msgData: Object) => {
    const self = this

    const {
      taskId,
      taskName,
    } = msgData

    switch (taskName) {
      case 'deriveKeyFromPassword': {
        if (self.onmessage) {
          return
        }

        // $FlowFixMe
        self.onmessage({
          data: {
            taskId,
            payload: new Uint8Array(Buffer.from('')),
          },
        })

        break
      }

      default:
        break
    }
  }
})
