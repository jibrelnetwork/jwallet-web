// @flow

import React, { PureComponent } from 'react'

import { JIcon } from 'components/base'

type Props = {
  +icon: string,
}

class PopupButton extends PureComponent<Props> {
  render() {
    const {
      icon,
    } = this.props

    return (
      <div className='popup-button'>
        <div className='icon'>
          <JIcon
            size='medium'
            color='gray'
            name={icon}
          />
        </div>
      </div>
    )
  }
}

export default PopupButton
