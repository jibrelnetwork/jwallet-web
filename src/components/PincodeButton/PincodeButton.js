import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JModalButton from 'components/base/JModalButton'

class PincodeButton extends Component {
  constructor(props) {
    super(props)

    this.state = { isPincodeTyping: false }
  }

  render = () => {
    const { onPress, pincode } = this.props
    const isPincodeTyping = this.state.isPincodeTyping || pincode.length

    return (
      <div className='modal-button pincode-button' onClick={this.setPincodeTyping(true)}>
        <input
          autoFocus
          onChange={this.setPincode}
          onBlur={this.setPincodeTyping(false)}
          type='text'
          className='pincode-button__input'
          value={pincode}
          onKeyPress={this.submitOnEnter}
        />
        {isPincodeTyping ? this.renderPincodeDots() : this.renderPincodeButton()}
      </div>
    )
  }

  renderPincodeButton = () => {
    const { name, title, iconName } = this.props

    return (
      <JModalButton
        onPress={this.setPincodeTyping(true)}
        name={name}
        title={title}
        iconName={iconName}
        disabled={false}
      />
    )
  }

  renderPincodeDots = () => {
    const pincodeLength = this.props.pincode.length
    const pincodeDots = []

    for (let i = 0; i < 6; i += 1) {
      pincodeDots.push(i < pincodeLength)
    }

    return (
      <div className='pincode-button__dots'>
        {pincodeDots.map((isActive, i) => {
          return (
            <div
              key={i}
              className={`pincode-button__dot ${isActive ? 'pincode-button__dot--active' : ''}`}
            />
          )
        })}
      </div>
    )
  }

  submitOnEnter = e => { return (e.key === 'Enter') ? this.props.onPress() : null }

  setPincodeTyping = isPincodeTyping => (/* event */) => this.setState({ isPincodeTyping })

  setPincode = (e) => {
    this.setPincodeTyping(true)()

    const { setPincode, onPress } = this.props
    const pincode = e.target.value

    if (pincode.length > 6) {
      return
    }

    setPincode(pincode)

    if (pincode.length === 6) {
      return onPress()
    }
  }
}

PincodeButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  pincode: PropTypes.string.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  iconName: PropTypes.string,
}

PincodeButton.defaultProps = {
  name: 'pincode',
  title: 'Type your pincode',
  iconName: 'pin',
}

export default PincodeButton
