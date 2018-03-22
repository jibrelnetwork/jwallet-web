/* @flow */

import { withHandlers } from 'recompose'

import WalletHeader from './WalletHeader'

export default withHandlers({
  onButtonClick: () => () => { window.location = 'https://jwallet.network' },
})(WalletHeader)
