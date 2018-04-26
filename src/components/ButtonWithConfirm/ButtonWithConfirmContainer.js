// @flow

import { compose } from 'ramda'
import { withState } from 'recompose'

import ButtonWithConfirm from './ButtonWithConfirm'

export default compose(
  withState('isActive', 'toggle', false),
  withState('isHovered', 'setHovered', false)
)(ButtonWithConfirm)
