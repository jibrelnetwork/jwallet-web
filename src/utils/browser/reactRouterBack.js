// @flow

import { goBack, push } from 'react-router-redux'

type BackPayload = {|
  +fallbackUrl?: string,
|}

function reactRouterBack(payload: BackPayload) {
  if (window && window.history && window.history.length > 2) {
    return goBack()
  } else if (payload && payload.fallbackUrl) {
    return push(payload.fallbackUrl)
  }
  return {}
}

export default reactRouterBack
