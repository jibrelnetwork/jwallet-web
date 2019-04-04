// @flow

import JError from './JError'

class ActiveWalletNotFoundError extends JError<{||}> {
  constructor() {
    super()
    this.name = 'ActiveWalletNotFoundError'
  }
}

export default ActiveWalletNotFoundError
