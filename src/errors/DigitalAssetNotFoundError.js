// @flow

import JError, { type JErrorData } from './JError'

type DigitalAssetNotFoundErrorData = {|
  +address: AssetAddress,
|}

class DigitalAssetNotFoundError extends JError<DigitalAssetNotFoundErrorData> {
  constructor(data: JErrorData<DigitalAssetNotFoundErrorData>, message?: string) {
    super(data, message)
    this.name = 'DigitalAssetNotFoundError'
  }
}

export default DigitalAssetNotFoundError

