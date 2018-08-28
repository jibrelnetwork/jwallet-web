// @flow

import { withHandlers } from 'recompose'

import WalletHeader from './WalletHeader'

export default withHandlers({
  goToLanding: () => () => { window.location.href = 'https://jwallet.network' },
})(WalletHeader)
