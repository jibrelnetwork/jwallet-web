// @flow strict

import { type Store } from 'redux'

import {
  showToast,
  hideToast,
} from 'store/modules/toasts'

const ONE_SECOND: number = 1000
const TOAST_DELAY: number = 3 * ONE_SECOND

class ToastsPlugin {
  store: ?Store<AppState, any>

  constructor() {
    this.store = null
  }

  connect = (store: Store<AppState, any>) => {
    this.store = store
  }

  getState = (): AppState => {
    if (!this.store) {
      throw new Error('Plugin error')
    }

    return this.store.getState()
  }

  dispatch = (action: Object) => {
    if (!this.store) {
      throw new Error('Plugin error')
    }

    return this.store.dispatch(action)
  }

  showToast = (
    message: string,
    options?: ToastOptions = { type: 'base' },
  ) => {
    this.dispatch(showToast(
      message,
      options,
    ))

    if (!options || (options.type !== 'base')) {
      return
    }

    setTimeout(() => {
      this.dispatch(hideToast())
    }, TOAST_DELAY)
  }
}

export const toastsPlugin = new ToastsPlugin()
