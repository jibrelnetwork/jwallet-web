// @flow

import DigitalAssetsSendViewContainer from './DigitalAssetsSendViewContainer'
import DigitalAssetsSendConfirmViewContainer from './DigitalAssetsSendConfirmViewContainer'

const confirm = {
  path: 'send/confirm',
  component: DigitalAssetsSendConfirmViewContainer,
}

const send = {
  path: 'send',
  component: DigitalAssetsSendViewContainer,
}

export default [
  confirm,
  send,
]
