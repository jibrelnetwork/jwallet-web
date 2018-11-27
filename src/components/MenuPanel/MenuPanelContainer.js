// @flow

import { connect } from 'react-redux'
import { withState } from 'recompose'
import { compose } from 'ramda'

import { setLanguage } from 'routes/modules/i18n'
import { setCurrentNetwork as setNetwork } from 'routes/modules/networks'

import MenuPanel from './MenuPanel'

const mapStateToProps = () => ({
  currentNetwork: 'Ropsten',
  currentLanguage: 'en',
  networks: {},
  isWalletReadOnly: false,
})

const mapDispatchToProps = { setLanguage, setNetwork }

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('activeSelect', 'toggleSelect', null),
)(MenuPanel)
