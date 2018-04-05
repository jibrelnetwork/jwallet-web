// @flow

import { withState } from 'recompose'

import MenuSelect from './MenuSelect'

export default withState('isOpen', 'toggle', false)(MenuSelect)
