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

    const timeout = this.state.timeout || config.defaultAppearableTimeout

    setTimeout(() => this.setState({ opening: false, closing: false }), timeout)
  }
}

Appearable.propTypes = {
  isOpen: PropTypes.bool,
}

Appearable.defaultProps = {
  isOpen: true,
}

export default Appearable
