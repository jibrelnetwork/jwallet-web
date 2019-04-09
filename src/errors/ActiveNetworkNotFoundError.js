// @flow

import JError from './JError'

class ActiveNetworkNotFoundError extends JError<{||}> {
  constructor() {
    super()
    this.name = 'ActiveNetworkNotFoundError'
  }
}

export default ActiveNetworkNotFoundError
