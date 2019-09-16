// @flow strict

import uuidv4 from 'uuid/v4'
import config from 'config'
import { type Persistor } from 'redux-persist/lib/types'

import * as blocks from 'store/modules/blocks'
import * as ticker from 'store/modules/ticker'

export default function startSessionWatcher(
  persistor: Persistor,
  dispatch: Function,
  callback: Function,
): void {
  const appID = uuidv4()
  const tabIDKey = config.sessionIDKey

  if (appID !== localStorage.getItem(tabIDKey)) {
    localStorage.setItem(tabIDKey, appID)
  }

  const listener = window.addEventListener('storage', (event) => {
    if ((event.key === tabIDKey) && (event.newValue !== appID)) {
      persistor.pause()

      dispatch(blocks.syncStop())
      dispatch(ticker.syncStop())

      window.removeEventListener('storage', listener)

      callback(false)
    }
  })
}
