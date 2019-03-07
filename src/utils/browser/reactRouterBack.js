// @flow

import {
  push,
  goBack,
  type RouterAction,
} from 'react-router-redux'

type RouterBackPayload = {|
  +fallbackUrl?: string,
|}

type RouterBackAction = RouterAction | {||}

function reactRouterBack(payload: RouterBackPayload): RouterBackAction {
  if ((typeof window !== 'undefined') && window && window.history && window.history.length > 2) {
    return goBack()
  } else if (payload.fallbackUrl) {
    return push(payload.fallbackUrl)
  }

  return {}
}

export default reactRouterBack
