import { Component } from 'react'
import PropTypes from 'prop-types'

import config from 'config'

class Appearable extends Component {
  constructor(props) {
    super(props)
    this.state = { opening: false, closing: false }
  }

  open = isClosed => this.setOpeningClosing({ opening: isClosed })
  close = isOpened => this.setOpeningClosing({ closing: isOpened })
  isOpen = () => (this.props.isOpen || this.state.closing)

  setOpeningClosing = (state) => {
    this.setState(state)
    const initialState = { opening: false, closing: false }

    setTimeout(() => this.setState(initialState), this.props.appearableTimeout)
  }
}

Appearable.propTypes = {
  appearableTimeout: PropTypes.number,
  isOpen: PropTypes.bool,
}

Appearable.defaultProps = {
  appearableTimeout: config.defaultAppearableTimeout,
  isOpen: true,
}

export default Appearable
