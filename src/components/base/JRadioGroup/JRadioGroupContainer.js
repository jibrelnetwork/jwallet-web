/* @flow */

import { compose } from 'ramda'
import { withState, withHandlers } from 'recompose'

import JRadioGroup from './JRadioGroup'

export default compose(
  withState(
    'checkedItem',
    'checkItem',
    ({ defaultCheckedItemIndex }) => defaultCheckedItemIndex
  ),
  withHandlers({
    onChange: ({ onChange, checkItem }) =>
      (index, value) => {
        onChange(value)
        checkItem(index)
      },
  })
)(JRadioGroup)
