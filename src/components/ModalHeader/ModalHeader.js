// @flow

import React, { PureComponent } from 'react'

import JText from 'components/base/JText'
import ESCButton from 'components/ESCButton'

type ModalHeaderColor = 'white' | 'gray'
type ModalHeaderIconName = 'arrow-left' | 'padding-cross'

type Props = {|
  +onBack: () => void,
  +title: string,
  +color: ModalHeaderColor,
  +iconName: ModalHeaderIconName,
  +isDisabled: boolean,
|}

class ModalHeader extends PureComponent<Props> {
  static defaultProps = {
    isDisabled: false,
    iconName: 'arrow-left',
  }

  render() {
    const {
      onBack,
      color,
      title,
      iconName,
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
            iconName={iconName}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    )
  }
}

export default ModalHeader
