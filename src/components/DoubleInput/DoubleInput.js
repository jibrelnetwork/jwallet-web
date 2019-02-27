// @flow

import React, { PureComponent } from 'react'

import {
  JIcon,
  JText,
  JInput,
  JLoader,
} from 'components/base'

type DoubleInputItemHandler = (string) => void

type DoubleInputItem = {|
  +handleChange?: DoubleInputItemHandler,
  +value: string,
  +placeholder: string,
  +isLoading?: boolean,
  +isDisabled?: boolean,
|}

type DoubleInputHandler = () => void

type Props = {|
  +onClose: ?DoubleInputHandler,
  +items: DoubleInputItem[],
  +errorMessage: string,
  +infoMessage: string,
|}

class DoubleInput extends PureComponent<Props> {
  static defaultProps = {
    onClose: null,
    errorMessage: '',
    infoMessage: '',
  }

  render() {
    const {
      onClose,
      items,
      errorMessage,
      infoMessage,
    }: Props = this.props

    const [leftItem, rightItem]: DoubleInputItem[] = items

    if (!(leftItem && rightItem)) {
      return null
    }

    return (
      <div className='double-input'>
        <div className='wrap'>
          <div className='field'>
            <JInput
              onChange={leftItem.handleChange}
              value={leftItem.value}
              name={leftItem.placeholder}
              placeholder={leftItem.placeholder}
              type='text'
              color='gray'
              sideBorderRadius='left'
              isDisabled={leftItem.isDisabled}
            />
            {!!leftItem.isLoading && (
              <div className='loader'>
                <JLoader color='blue' />
              </div>
            )}
          </div>
          <div className='field'>
            <JInput
              onChange={rightItem.handleChange}
              value={rightItem.value}
              name={rightItem.placeholder}
              placeholder={rightItem.placeholder}
              type='text'
              color='gray'
              sideBorderRadius='right'
              isDisabled={rightItem.isDisabled}
            />
            {!!rightItem.isLoading && (
              <div className='loader'>
                <JLoader color='blue' />
              </div>
            )}
          </div>
        </div>
        {onClose && (
          <div className='close' onClick={onClose}>
            <JIcon name='padding-cross' color='gray' />
          </div>
        )}
        {errorMessage && (
          <div className='message'>
            <JText value={errorMessage} color='red' size='small' />
          </div>
        )}
        {infoMessage && (
          <div className='message'>
            <JText value={infoMessage} color='orange' size='small' />
          </div>
        )}
      </div>
    )
  }
}

export default DoubleInput
