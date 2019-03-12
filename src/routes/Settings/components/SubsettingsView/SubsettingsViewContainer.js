// @flow

import { connect } from 'react-redux'

import reactRouterBack from 'utils/browser/reactRouterBack'

import SubsettingsView from './SubsettingsView'

const mapDispatchToProps = {
  close: () => reactRouterBack({ fallbackUrl: '/settings' }),
}

/* ::
type OwnProps = {|
  +children: React$Node,
  +title: string,
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(null, mapDispatchToProps)(SubsettingsView)
)
