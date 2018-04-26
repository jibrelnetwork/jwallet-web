// @flow

import { compose } from 'ramda'
import { withState } from 'recompose'

import Expandable from './Expandable'

export default compose(
  withState('isOpen', 'toggle', false),
  withState('isHovered', 'setHovered', false),
)(Expandable)
