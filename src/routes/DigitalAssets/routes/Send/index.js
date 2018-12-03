// @flow

import DigitalAssetsSendViewContainer from './DigitalAssetsSendViewContainer'

const send = {
  path: 'send',
  component: DigitalAssetsSendViewContainer,
}

const sendAsset = {
  path: 'send/:asset/',
  component: DigitalAssetsSendViewContainer,
}

const sendAssetTo = {
  path: 'send/:asset/:to',
  component: DigitalAssetsSendViewContainer,
}

const repeatPayment = {
  path: 'send/repaat/:txhash',
  component: DigitalAssetsSendViewContainer,
}

export default {
  send,
  sendAsset,
  sendAssetTo,
  repeatPayment,
}
