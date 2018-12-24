// @flow

import React, { PureComponent } from 'react'
import { JInput, JLoader, JIcon, JText } from 'components/base'

type Props = {|
  +onChangeLeft: (value: string) => void,
  +onChangeRight: ?((value: string) => void),
  +onClose: ?(() => void),
  +valueLeft: string,
  +valueRight: string,
  +warningMessage: string,
  +placeholderLeft: string,
  +placeholderRight: string,
  +errorMessage: string,
  +isLoadingLeft: boolean,
  +isLoadingRight: boolean,
|}

class DoubleInput extends PureComponent<Props> {
  static defaultProps = {
    onChangeRight: null,
    onClose: null,
    isLoadingLeft: false,
    isLoadingRight: false,
  }

  render() {
    const {
      onChangeLeft,
      onChangeRight,
      onClose,
      valueLeft,
      valueRight,
      warningMessage,
      placeholderLeft,
      placeholderRight,
      errorMessage,
      isLoadingLeft,
      isLoadingRight,
    } = this.props
    return (
      <div className='double-input'>
        <div className='wrap'>
          <div className='field'>
            <JInput
              onChange={onChangeLeft}
              value={valueLeft}
              name={placeholderLeft}
              placeholder={placeholderLeft}
              type='text'
              color='gray'
              sideBorderRadius='left'
            />
            {isLoadingLeft && (
              <div className='loader'>
                <JLoader color='blue' />
              </div>
            )}
          </div>
          <div className='field'>
            <JInput
              onChange={onChangeRight}
              value={valueRight}
              name={placeholderRight}
              placeholder={placeholderRight}
              type='text'
              color='gray'
              sideBorderRadius='top'
            />
            {isLoadingRight && (
              <div className='loader'>
                <JLoader color='blue' />
              </div>
            )}
          </div>
        </div>
        {onClose &&
        <div className='close' onClick={onClose}>
          <JIcon name='padding-cross' size='medium' color='gray' />
        </div>}
        {errorMessage &&
        <div className='message'>
          <JText value={errorMessage} color='red' size='small' />
        </div>
        }
        {warningMessage &&
        <div className='message'>
          <JText value={warningMessage} color='orange' size='small' />
        </div>
        }
      </div>
    )
  }
}

export default DoubleInput
