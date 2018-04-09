// @flow

import { withState } from 'recompose'

import ButtonWithConfirm from './ButtonWithConfirm'

export default withState('isActive', 'toggle', false)(ButtonWithConfirm)
