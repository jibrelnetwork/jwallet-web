import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JIcon from 'components/base/JIcon'

class Notification extends Component {
  componentDidMount() {
    this.props.checkNotification()
  }

  render() {
    const { closeNotification, isOpen } = this.props

    if (!isOpen) {
      return null
    }

    return (
      <div className='notification'>
        <a
          onClick={closeNotification}
          href='https://sale.jibrel.network'
          className='notification__content'
          target='_blank'
        >
          <span className='notification__icon' />
          <span className='notification__text'>
            <span className='notification__title'>{'Token Sale is now live'}</span>
            <span className='notification__subtitle'>
              {'Jibrel provides traditional financial assets,'}<br />
              {' as ERC-20 tokens, on the Ethereum blockchain'}
            </span>
            <span className='notification__subtitle-mobile'>{'Participate in token sale'}</span>
          </span>
          <span className='notification__link'>{'Participate in token sale'}</span>
          <JIcon
            onClick={this.closeNotification}
            name='close-white'
            className='notification__close'
          />
        </a>
      </div>
    )
  }

  closeNotification = (e) => {
    e.preventDefault()

    this.props.closeNotification()

    e.stopPropagation()
  }
}

Notification.propTypes = {
  checkNotification: PropTypes.func.isRequired,
  closeNotification: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default Notification
