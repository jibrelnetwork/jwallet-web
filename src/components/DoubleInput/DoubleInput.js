// @flow

import React, { PureComponent } from 'react'
import { JInput, JLoader, JIcon } from 'components/base'

/*
type Props = {|
  +onChangeLeft: (value: string) => void,
  +onChangeRight: ?((value: string) => void),
  +onClose: ?(() => void),
  valueLeft: string,
  valueRight: string,
  placeholderLeft: string,
  placeholderRight: string,
  errorMessage: string,
  isLoading: boolean,
|}
*/

type Props = {|
  +onChangeLeft: (value: string) => void,
  +onChangeRight: ?((value: string) => void),
  +onClose: ?(() => void),
  +valueLeft: string,
  +valueRight: string,
  +placeholderLeft: string,
  +placeholderRight: string,
  +errorMessage: string,
  +isLoading: boolean,
|}

class DoubleInput extends PureComponent<Props> {
  static defaultProps = {
    isLoading: false,
    onClose: null,
  }

  render() {
    const {
      onChangeLeft,
      onChangeRight,
      onClose,
      valueLeft,
      valueRight,
      placeholderLeft,
      placeholderRight,
      errorMessage,
      isLoading,
    } = this.props
    return (
      <div className='double-input'>
        <div className='field'>
          <JInput
            onChange={onChangeLeft}
            value={valueLeft}
            name={placeholderLeft}
            errorMessage={errorMessage}
            placeholder={placeholderLeft}
            type='text'
            color='gray'
            sideBorderRadius='left'
          />
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
          {isLoading && (
            <div className='loader'>
              <JLoader color='blue' />
            </div>
          )}
        </div>
        {!onClose &&
        <div className='close' onClick={onClose}>
          <JIcon name='padding-cross' size='medium' color='gray' />
        </div>}
      </div>
    )
  }
}

export default DoubleInput
