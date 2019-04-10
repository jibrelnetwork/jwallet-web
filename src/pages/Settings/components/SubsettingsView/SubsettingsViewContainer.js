// @flow

import { connect } from 'react-redux'

import { router5BackOrFallbackFunctionCreator } from 'utils/browser'

import SubsettingsView from './SubsettingsView'

function mapStateToProps(state: AppState) {
  return {
    close: router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet.Settings',
    ),
  }
}

/* ::
type OwnProps = {|
  +children: React$Node,
  +title: string,
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, null)(SubsettingsView)
)
