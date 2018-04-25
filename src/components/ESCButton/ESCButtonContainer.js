// @flow

import { compose } from 'ramda'
import { lifecycle, withHandlers } from 'recompose'
import { withRouter } from 'react-router'

import ESCButton from './ESCButton'

const redirectOnESC = ({ router, locationAfterClose }) => ({ keyCode }) => {
  if (keyCode === 27) {
    router.push(locationAfterClose)
  }
}

export default compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      window.addEventListener(
        'keydown',
        redirectOnESC(this.props),
        true
      )
    },
    componentWillUnmount() {
      window.removeEventListener(
        'keydown',
        redirectOnESC(this.props),
        true
      )
    },
  }),
  withHandlers({
    onClick: ({ router, locationAfterClose }) => () => router.push(locationAfterClose),
  })
)(ESCButton)
