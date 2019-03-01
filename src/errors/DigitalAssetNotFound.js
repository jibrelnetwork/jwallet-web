// @flow

class DigitalAssetNotFoundError extends Error {
  address: AssetAddress

  constructor(address: AssetAddress) {
    super()
    this.name = 'DigitalAssetNotFoundError'
    this.address = address

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default DigitalAssetNotFoundError
