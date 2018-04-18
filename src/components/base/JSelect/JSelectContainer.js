// @flow

import { withState } from 'recompose'

import JSelect from './JSelect'

const JSelectContainer = withState('isOpen', 'toggle', false)(JSelect)

export default JSelectContainer
