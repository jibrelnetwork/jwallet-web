/* @flow */

import { compose } from 'ramda'
import { withState, withHandlers } from 'recompose'

import JSelect from './JSelect'

export default compose(
  withState('isOpen', 'toggle', false),
  withHandlers({
    open: ({ toggle }) => () => toggle(true),
    close: ({ toggle }) => () => toggle(false),
  }),
  withHandlers({
    onItemSelect: ({ onItemSelect, close }) =>
      (itemId) => {
        close()
        onItemSelect(itemId)
      },
  }),
)(JSelect)
