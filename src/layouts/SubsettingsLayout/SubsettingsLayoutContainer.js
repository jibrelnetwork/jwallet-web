// @flow
import { connect } from 'react-redux'

import reactRouterBack from 'utils/browser/reactRouterBack'

import SubsettingsLayout from './SubsettingsLayout'

const mapDispatchToProps = {
  closeClick: () => reactRouterBack({ fallbackUrl: '/settings' }),
}
export default (
  connect/* :: < AppState, any, Object, _, _ > */(null, mapDispatchToProps)(SubsettingsLayout)
)
