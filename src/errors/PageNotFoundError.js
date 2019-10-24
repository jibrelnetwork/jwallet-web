// @flow

import JError from './JError'

export class PageNotFoundError extends JError<{||}> {
  constructor() {
    super()
    this.name = 'PageNotFoundError'
  }
}
