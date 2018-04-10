// @flow

import { withHandlers } from 'recompose'

import WalletHeader from './WalletHeader'

export default withHandlers({
  goToLanding: () => () => { window.location = 'https://jwallet.network' },
})(WalletHeader)
