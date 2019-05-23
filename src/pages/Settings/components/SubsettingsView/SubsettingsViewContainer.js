// @flow

import { connect } from 'react-redux'

import { router5BackOrFallbackFunctionCreator } from 'utils/browser'

// eslint-disable-next-line import/no-duplicates
import SubsettingsView from './SubsettingsView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './SubsettingsView'

function mapStateToProps(state: AppState) {
  return {
    close: router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet.Settings',
    ),
  }
}

type OwnProps = {|
  +children: React$Node,
  +title: string,
|}

export default (
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps, null)(SubsettingsView)
)
