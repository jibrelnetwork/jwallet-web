// @flow
import { connect } from 'react-redux'

import reactRouterBack from 'utils/browser/reactRouterBack'

import SubsettingsView from './SubsettingsView'

const mapDispatchToProps = {
  closeClick: () => reactRouterBack({ fallbackUrl: '/settings' }),
}
export default (
  connect/* :: < AppState, any, Object, _, _ > */(null, mapDispatchToProps)(SubsettingsView)
)
