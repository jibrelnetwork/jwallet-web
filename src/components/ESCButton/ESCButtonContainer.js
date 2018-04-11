// @flow

import { compose } from 'ramda'
import { lifecycle, withHandlers } from 'recompose'
import { withRouter } from 'react-router'

import ESCButton from './ESCButton'

const redirectOnESC = router => ({ keyCode }) => {
  if (keyCode === 27) { router.push('/') }
}

export default compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      window.addEventListener(
        'keydown',
        redirectOnESC(this.props.router),
        true
      )
    },
    componentWillUnmount() {
      window.removeEventListener(
        'keydown',
        redirectOnESC(this.props.router),
        true
      )
    },
  }),
  withHandlers({
    onClick: ({ router }) => router.push('/'),
  })
)(ESCButton)
