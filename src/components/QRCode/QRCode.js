import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EthereumQRPlugin from 'ethereum-qr-code'

const qr = new EthereumQRPlugin()

class QRCode extends Component {
  componentWillReceiveProps(nextProps) {
    this.renderQRCode(nextProps)
  }

  renderQRCode = (props) => {
    const { requisites, appearance } = props

    qr.toCanvas(requisites, { ...appearance, selector: '#qr-code' })
  }

  render = () => <div id='qr-code'/>
}

QRCode.propTypes = {
  requisites: PropTypes.shape({
    to: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    gas: PropTypes.number,
  }).isRequired,
  appearance: PropTypes.shape({
    size: PropTypes.number,
    errorCorrectionLevel: PropTypes.string,
    color: PropTypes.shape({
      light: PropTypes.string,
      dark: PropTypes.string,
    }),
  }),
}

QRCode.defaultProps = {
  appearance: {
    size: 150,
    errorCorrectionLevel: 'high',
    color: {
      light: '#ffcc00ff',
      dark: '#001111ff',
    },
  },
}

export default QRCode
