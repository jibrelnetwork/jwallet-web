// @flow

import { withState } from 'recompose'

import MnemonicPhrase from './MnemonicPhrase'

export default withState('hoveredItem', 'setHovered', null)(MnemonicPhrase)
