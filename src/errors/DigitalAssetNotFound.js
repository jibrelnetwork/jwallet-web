// @flow

class DigitalAssetNotFoundError extends Error {
  address: AssetAddress

  constructor(address: AssetAddress) {
    const message = `Digital asset with address ${address} not found`
    super(message)
    this.name = 'DigitalAssetNotFoundError'
    this.address = address

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

export default DigitalAssetNotFoundError
