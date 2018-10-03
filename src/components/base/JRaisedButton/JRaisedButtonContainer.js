// @flow

import { withState } from 'recompose'

import JRaisedButton from './JRaisedButton'

export default withState('isHovered', 'onHover', false)(JRaisedButton)
