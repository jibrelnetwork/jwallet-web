// @flow strict

import JError from './JError'

export class StorageError extends JError<{||}> {
  constructor(message?: string) {
    super(message)
    this.name = 'StorageError'
  }
}
