/* @flow */
import { compose } from 'ramda'
import { lifecycle } from 'recompose'
import { withRouter } from 'react-router-dom'

import ESCButton from '.'

const redirectOnESC = router => ({ keyCode }) => {
  if (keyCode === 27) { router.push('/') }
}

export default compose(
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
  withRouter,
)(ESCButton)
