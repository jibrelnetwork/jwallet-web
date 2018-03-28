// @flow

import { withState } from 'recompose'

import Expandable from './Expandable'

export default withState('isOpen', 'toggle', false)(Expandable)
