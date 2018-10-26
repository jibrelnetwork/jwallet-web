// @flow

import React, { PureComponent } from 'react'

import JText from 'components/base/JText'
import ESCButton from 'components/ESCButton'

type ModalHeaderColor = 'white' | 'gray'

type Props = {|
  +onBack: () => void,
  +color: ModalHeaderColor,
  +title: string,
  +isDisabled: boolean,
|}

class ModalHeader extends PureComponent<Props> {
  static defaultProps = {
    isDisabled: false,
  }

  render() {
    const {
      onBack,
      color,
      title,
      isDisabled,
    } = this.props

    return (
      <div className={`modal-header -${color}`}>
        <div className='title'>
          <JText value={title} color={color} size='title' />
        </div>
        <div className='button'>
          <ESCButton
            onESC={onBack}
            color={color}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    )
  }
}

export default ModalHeader
