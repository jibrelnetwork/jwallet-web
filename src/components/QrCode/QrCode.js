import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EthereumQRplugin from 'ethereum-qr-code'

class QrCode extends Component {
  constructor(props) {
    super(props)
    this.qr = new EthereumQRplugin()
  }

  componentDidMount() {
    this.renderQr()
  }

  renderQr() {
    const uiSettings = Object.assign({}, this.props.ui, {
      selector: '#in-app-qr-code',
    })
    this.qr.toCanvas(this.props.code, uiSettings)
  }

  render() {
    return <div className='app-qr-code'><div id='in-app-qr-code'/></div>
  }
}

QrCode.propTypes = {
  code: PropTypes.object.isRequired,
  ui: PropTypes.object,
}

QrCode.defaultProps = {
  ui: {},
}

export default QrCode
