// @flow

import { withState } from 'recompose'

import OverlayActions from './OverlayActions'

export default withState('hoveredItem', 'setHovered', null)(OverlayActions)
