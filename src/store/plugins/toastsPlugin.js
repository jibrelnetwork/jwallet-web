// @flow strict

import { type Store } from 'redux'

import {
  showToast,
  hideToast,
} from 'store/modules/toasts'

import { selectToastsData } from 'store/selectors/toasts'

const ONE_SECOND: number = 1000
const SHOW_TOAST_DELAY: number = 100
const HIDE_TOAST_DELAY: number = 3 * ONE_SECOND

class ToastsPlugin {
  store: ?Store<AppState, any>
  timeoutId: ?TimeoutID

  constructor() {
    this.store = null
    this.timeoutId = null
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

  getToast = (): ?ToastData => selectToastsData(this.getState())

  dispatch = (action: Object) => {
    if (!this.store) {
      throw new Error('Plugin error')
    }

    return this.store.dispatch(action)
  }

  showToastImmediately = (
    message: string,
    options: ToastOptions,
  ) => {
    this.dispatch(showToast(
      message,
      options,
    ))

    if (!options || (options.type !== 'base')) {
      return
    }

    this.timeoutId = setTimeout(() => {
      this.dispatch(hideToast())
    }, HIDE_TOAST_DELAY)
  }

  showToastWithDelay = (
    message: string,
    options: ToastOptions,
  ) => {
    setTimeout(() => {
      this.showToastImmediately(
        message,
        options,
      )
    }, SHOW_TOAST_DELAY)
  }

  showToast = (
    message: string,
    options?: ToastOptions = { type: 'base' },
  ) => {
    if (this.getToast()) {
      this.dispatch(hideToast())
      clearTimeout(this.timeoutId)

      this.showToastWithDelay(
        message,
        options,
      )
    } else {
      this.showToastImmediately(
        message,
        options,
      )
    }
  }
}

export const toastsPlugin = new ToastsPlugin()
